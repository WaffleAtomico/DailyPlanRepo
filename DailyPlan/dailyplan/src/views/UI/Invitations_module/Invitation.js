import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserFriends, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import { TiGroup } from 'react-icons/ti';
import '../../../styles/UI/Invitations/invitation_view.css';

import InvitationCard from './invitation_card';
import { getInvitationByUser, updateInvitationReason, updateInvitationState } from '../../../utils/validations/invitation';
import { myPojo } from '../../../utils/ShowNotifInfo';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';
import CancelReasonModal from './CancelReasonModal';  // Importamos el nuevo modal
import { IoAlertCircleOutline } from 'react-icons/io5';

export default function InvitationView(props) {
    const [data, setData] = useState([]);
    const [isCompletedArchivement, setIsCompletedArchivement] = useState(true);
    const [isCompletedArchivement2, setIsCompletedArchivement2] = useState(true);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [currentInvId, setCurrentInvId] = useState(null);

    useEffect(() => {
        // Function to fetch invitations from the API
        const fetchInvitations = () => {
            getInvitationByUser(parseInt(props.user_id, 10))
                .then(response => {
                    if (data) {
                        setData(response.data);
                        console.log("Data: ",data)
                    }
                })
                .catch(error => {
                    console.error('Error fetching invitations:', error);
                });
        };
        fetchInvitations();
        confirmArchivement1(props.user_id);
        confirmArchivement2(props.user_id);
    }, [props.user_id]);

    const confirmArchivement1 = (user_id) => {
        const grant_title_id = 3;
        isCompleted(user_id, grant_title_id).then(response => {
            // console.log("IsCompleted", response);
            if (response == false) {
                // console.log("Si es falso?", response)
                setIsCompletedArchivement(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    }
    const confirmArchivement2 = (user_id) => {
        const grant_title_id = 4;
        isCompleted(user_id, grant_title_id).then(response => {
            // console.log("IsCompleted", response);
            if (response == false) {
                // console.log("Si es falso?", response)
                setIsCompletedArchivement2(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    }

    const grant4Archivement = () => {
        const grant_title_id = 4;
        const user_id = props.user_id;
        console.log("Is completed:? ", isCompletedArchivement);
        if (!isCompletedArchivement) { //si no esta completado hay que entregarlo
            grantArchivement(user_id, grant_title_id).then(res => {
                console.log(res);
                myPojo.setNotif("Logro: REUNION", <TiGroup size={220} />);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        }
    };
    const grant5Archivement = () => {
        const grant_title_id = 5;
        const user_id = props.user_id;
        console.log("Is completed:? ", isCompletedArchivement2);
        if (!isCompletedArchivement2) { //si no esta completado hay que entregarlo
            grantArchivement(user_id, grant_title_id).then(res => {
                console.log(res);
                myPojo.setNotif("Logro: CONCIENTE", <IoAlertCircleOutline size={220} />);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        }
    };

    /*
    
    INVITATIONS STATES
    1 ============ ACCEPTED
    0 ============ REJECTED
    NULL ==== WAITING
    
    */
    const handleInvAccepted = (inv_id) => {
        //aceptar la invitacion recibida
        //si fue aceptada correctamente, entrega el logro
        updateInvitationState(inv_id, 1).then(res => {
            if (res) {
                grant4Archivement();
            }
        }).catch(err => { console.log(err) })
    }

    const handleInvRejected = (inv_id) => {
        // Cancelar una invitación que no ha sido aceptada
        updateInvitationState(inv_id, 0).then(res => {
            if (res) {
                alert("Invitación cancelada correctamente");
            }
        }).catch(err => { console.log(err) })
    }

    const handleInvCanceled = (inv_id) => {
        // Mostrar el modal para ingresar el motivo de cancelación
        setShowCancelModal(true);
        setCurrentInvId(inv_id);
    }

    const handleSaveCancelReason = (reason) => {
        setShowCancelModal(false);
        updateInvitationReason(currentInvId, (reason.length > 0 ? reason : null)).then(res => {

            if (res) {
                updateInvitationState(currentInvId, 0).then(res => {
                    if (reason.length > 0) {
                        grant5Archivement();
                    }
                }).catch(err => { console.log(err) })
            }
        }).catch(err => { console.log(err) })

    }

    const handleInvObjectives = () => {
        //en este se va a poder ver una vista de los objetivos de un recordatorio
        //Y si, son los objetivos de todas las personas dentro de un recordatorio
        //Todos los usuarios que agregaron objetivos en su recordatorio o tengan X numero de tiempo
        //Se va a mostrar, osea
        //Si no tienen objetivos, solo tiempo
        //Si tienen objetivos, solo los bloques y cuanto tarda cada uno
        //Eso y que si esta completados todos los objetivos de ese bloque, pues, tmb, debe de estar como terminado
        //Para tener ese "Rastreo" de que tanto le falta para terminar
        //Tambien si tiene objetivos, se va a mostrar el tiempo de viaje que tiene 
    }

    const handleInvSettings = (inv_id) => {
        //ver la configuracion de una alarma y cambiarla
    }

    const handleInvDelete = (inv_id) => {
        //eliminar el recordatorio por parte del creador
        //cancela y elimina creo, o elimina completamente npi ahorita veo
    }

    return (
        <Container fluid className="invitation-view" >
            <Row className="invitation-cards-container">
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones pendientes"
                        color="#EE7D02"
                        Icon={FaUserFriends}
                        content={data ? data.filter(invitation => invitation.state === null
                            && invitation.user_id_owner != parseInt(props.user_id, 10)) : []}
                        flag={1}
                        handleInvAccepted={handleInvAccepted}
                        handleInvRejected={handleInvRejected}
                    />
                </Col>
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones activas"
                        color="#00B85A"
                        Icon={FaUserCheck}
                        content={data ? data.filter(invitation => invitation.state === 1
                            && invitation.user_id_owner != parseInt(props.user_id, 10)) : []}
                        flag={2}
                        handleInvCanceled={handleInvCanceled}
                        handleInvObjectives={handleInvObjectives}
                    />
                </Col>
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones creadas"
                        color="#5368DC"
                        Icon={FaUserPlus}
                        content={data ? data.filter(invitation => invitation.state === 1
                            && invitation.user_id_owner === parseInt(props.user_id, 10)) : []}
                        flag={3}
                        handleInvObjectives={handleInvObjectives}
                        handleInvSettings={handleInvSettings}
                        handleInvDelete={handleInvDelete}
                    />
                </Col>
            </Row>
            <CancelReasonModal
                show={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onSave={handleSaveCancelReason}
            />
        </Container>
    );
}
