import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserFriends, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import { LuMailX } from "react-icons/lu";
import { TiGroup } from 'react-icons/ti';
import { checkScheduleConflict, findConflictEvent } from '../../../utils/validations/schedule';
import '../../../styles/UI/Invitations/invitation_view.css';
import { getAlarmById } from '../../../utils/validations/alarm';
import { getReminderById } from '../../../utils/validations/reminders';
import InvitationCard from './invitation_card';
import { deleteInvitation, getInvitationByUser, updateInvitationReason, updateInvitationState } from '../../../utils/validations/invitation';
import { myPojo } from '../../../utils/ShowNotifInfo';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';
import CancelReasonModal from './CancelReasonModal';  // Importamos el nuevo modal
import { IoAlertCircleOutline } from 'react-icons/io5';
import InvUserList from './InvUsers';
import { deleteReminderShare, saveReminderShare } from '../../../utils/validations/remindershare';
import { addNotification } from '../../../utils/validations/notification';
import InvObjectivesBlock from './InvObjectivesBlock';

export default function InvitationView(props) {
    const [data, setData] = useState([]);
    const [isCompletedArchivement1, setIsCompletedArchivement1] = useState(true);
    const [isCompletedArchivement2, setIsCompletedArchivement2] = useState(true);

    const [showCancelModal, setShowCancelModal] = useState(false);
    const [currentInvId, setCurrentInvId] = useState(null);
    const [CurrentOwner, setCurrentOwner] = useState(null);
    const [showUserList, setShowUserList] = useState(false);
    const [showObjectivesBlock, setshowObjectivesBlock] = useState(false);


    const [CurrentReminderId, setCurrentReminderId] = useState(null);
    const [CurrentAlarmId, setCurrentAlarmId] = useState(null)
    const [CurrentOwnerId, setCurrentOwnerId] = useState(null);
    const [pendingInvitations, setPendingInvitations] = useState([]);
    const [activeInvitations, setActiveInvitations] = useState([]);
    const [createdInvitations, setCreatedInvitations] = useState([]);


    useEffect(() => {
        // Function to fetch invitations from the API
        fetchInvitations();
        confirmArchivement4(props.user_id);
        confirmArchivement5(props.user_id);
    }, [props.user_id]);

    const fetchInvitations = () => {
        getInvitationByUser(parseInt(props.user_id, 10))
            .then(response => {
                if (response.data) {
                    setData(response.data);
                    // console.log("Data: ", response.data);
                    // Filtrado de invitaciones
                    const pending = response.data
                        .map(invitation => ({
                            inv_id: invitation.inv_id,
                            reminder_id: invitation.reminder_id,
                            alarm_id: invitation.alarm_id,
                            user_id_owner: invitation.user_id_owner,
                            inv_state: invitation.inv_state,
                            inv_reason: invitation.inv_reason,
                            user_id_target: invitation.user_id_target
                        }))
                        .filter(invitation => invitation.inv_state === null && invitation.user_id_owner !== parseInt(props.user_id, 10));

                    // Filtrado de invitaciones activas
                    const active = response.data
                        .map(invitation => ({
                            inv_id: invitation.inv_id,
                            reminder_id: invitation.reminder_id,
                            alarm_id: invitation.alarm_id,
                            user_id_owner: invitation.user_id_owner,
                            inv_state: invitation.inv_state,
                            inv_reason: invitation.inv_reason,
                            user_id_target: invitation.user_id_target
                        }))
                        .filter(invitation => invitation.inv_state === 1 && invitation.user_id_owner !== parseInt(props.user_id, 10));

                    // Filtrado de invitaciones creadas
                    const created = response.data
                        .map(invitation => ({
                            inv_id: invitation.inv_id,
                            reminder_id: invitation.reminder_id,
                            alarm_id: invitation.alarm_id,
                            user_id_owner: invitation.user_id_owner,
                            inv_state: invitation.inv_state,
                            inv_reason: invitation.inv_reason,
                            user_id_target: invitation.user_id_target
                        }))
                        .filter(invitation => invitation.user_id_owner === parseInt(props.user_id, 10));

                    setPendingInvitations(pending);
                    // console.log("Pending: ", pending);
                    setActiveInvitations(active);
                    // console.log("active: ", active);
                    setCreatedInvitations(created);
                    // console.log("Created: ", created);

                }
            })
            .catch(error => {
                console.error('Error fetching invitations:', error);
            });
    };
    const confirmArchivement4 = (user_id) => {
        const grant_title_id = 3;
        isCompleted(user_id, grant_title_id).then(response => {
            if (response === false) {
                console.log("No esta completado el 4");
                setIsCompletedArchivement1(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    }
    const grant4Archivement = () => {
        const grant_title_id = 4;
        const user_id = props.user_id;
        console.log("Is completed:? ", isCompletedArchivement1);
        if (!isCompletedArchivement1) { //si no esta completado hay que entregarlo
            grantArchivement(user_id, grant_title_id).then(res => {
                console.log(res);
                myPojo.setNotif("Logro: REUNION", <TiGroup size={220} />);
                setIsCompletedArchivement1(true);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        }
    };
    const confirmArchivement5 = (user_id) => {
        const grant_title_id = 4;
        isCompleted(user_id, grant_title_id).then(response => {
            if (response === false) {
                console.log("No esta completado el 5")
                setIsCompletedArchivement2(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    }
    const grant5Archivement = () => {
        const grant_title_id = 5;
        const user_id = props.user_id;
        console.log("Is completed:? ", isCompletedArchivement2);
        if (!isCompletedArchivement2) { //si no esta completado hay que entregarlo
            grantArchivement(user_id, grant_title_id).then(res => {
                console.log(res);
                myPojo.setNotif("Logro: CONCIENTE", <IoAlertCircleOutline size={220} />);
                setIsCompletedArchivement1(true);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        }
    };
    const grant12Archivement = (OwnerUser_id) => {
        const grant_title_id = 12;
        const user_id = OwnerUser_id;
        // console.log("Is completed:? ", isCompletedArchivement2);
        isCompleted(user_id, (grant_title_id - 1)).then(response => {
            if (response === false) {
                grantArchivement(user_id, grant_title_id).then(res => {
                    console.log("Si le otorgue el logro a el otro usuario: ", res);
                }).catch(error => {
                    console.error("Error granting achievement:", error);
                });
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    };
    /*
    INVITATIONS STATES
    1 ============ ACCEPTED
    0 ============ REJECTED
    NULL ==== WAITING
    */
    const handleInvAccepted = (inv_id, user_id_owner, invType, reminder_id, alarm_id) => {
        //aceptar la invitacion recibida
        //si fue aceptada correctamente, entrega el logro
        // console.log("Entre a invitaciones aceptadas", inv_id);

        //Crear objecto para verificar conflicto
        
        if(reminder_id ===  null && alarm_id !== null)
        {
            getAlarmById(alarm_id).then(response => {

                    if(response.data.length > 0)
                    {
                        const alarmEvent = response.data[0];
                        
                    }
            })

        }


        updateInvitationState(true, inv_id).then(res => {
            // console.log(res)
            if (res.status) {
                // console.log("Si jala bn, o deberia de actualizar");
                fetchInvitations();
                if (invType) { //true reminder
                    const reminderShareInfo = {
                        rs_user_id_target: props.user_id, //yo soy qn la acepta, por ende soy el target
                        reminder_id: reminder_id,
                    }
                    saveReminderShare(reminderShareInfo).then(res => {
                        // console.log("Reminder share response ",res)
                        if (res) {
                            // console.log("Si agrego el registro de reminderShare",res.data);
                            grant4Archivement();
                            grant12Archivement(user_id_owner);
                        }
                    }
                    ).catch(err => { console.log(err) })
                } else { //false alarm
 
                }
            }
        }).catch(err => { console.log(err) })
    }

    const handleInvUsers = (inv_id, ownerId, invRemId, invAlarmId) => {
        // console.log("Owner",ownerId);
        if (invRemId) {
            setCurrentOwner(ownerId);
            setCurrentReminderId(invRemId);
            setCurrentAlarmId(null);
        }
        if (invAlarmId) {
            setCurrentOwner(ownerId);
            setCurrentAlarmId(invAlarmId);
            setCurrentReminderId(null);
        }
        setShowUserList(true);
    }

    useEffect(() => {
        if (showUserList == false) {
            setCurrentReminderId(null);
            setCurrentAlarmId(null);
            setCurrentOwner(null);
        }
        // console.log(CurrentAlarmId);
        // console.log(CurrentReminderId)
    }, [showUserList])

    const handleInvRejected = (inv_id) => {
        // Cancelar una invitación que no ha sido aceptada
        // console.log("Rechazada");
        updateInvitationState(false, inv_id).then(res => {
            if (res) {
                fetchInvitations();
                alert("Invitación cancelada correctamente");
            }
        }).catch(err => { console.log(err) })
    }

    const handleInvCanceled = (inv_id, user_id_owner, reminder_id, alarm_id) => {
        // Mostrar el modal para ingresar el motivo de cancelación
        if (reminder_id) {
            setCurrentReminderId(reminder_id);
            setCurrentAlarmId(null);
        }
        if (alarm_id) {
            setCurrentAlarmId(alarm_id);
            setCurrentReminderId(null);
        }
        console.log(user_id_owner);
        if (inv_id && user_id_owner) {
            setShowCancelModal(true);
            setCurrentInvId(inv_id);
            setCurrentOwner(user_id_owner);
        }
    }

    const handleSaveCancelReason = (reason) => {
        // console.log(reason ? (reason.length > 0 ? reason : "") : "");
        updateInvitationReason(currentInvId, (reason ? (reason.length > 0 ? reason : "") : "")).then(res => {
            // console.log("res updateInvitationReazon: ",res);
            if (res) {
                // console.log(reason);
                updateInvitationState(false, currentInvId).then(res => {
                    if (res.status && (reason ? (reason.length > 0 ? true : false) : false)) {
                        console.log("Si ha avisado que cancela");
                        const notificationInfo = {
                            notification_name: `Cancelación: ${reason}`,
                            notification_type: 1,
                            user_id: CurrentOwner,
                        }
                        // console.log(reason);
                        addNotification(notificationInfo).then(res => {
                            if (res.status) {
                                grant5Archivement();
                                console.log("Si ha avisado que cancela");
                                fetchInvitations();
                            }
                        }).catch(err => { console.log(err) });

                        setShowCancelModal(false);
                    }
                    deleteReminderShare(props.user_id, CurrentReminderId);
                    fetchInvitations();
                }).catch(err => { console.log(err) })
            }
        }).catch(err => { console.log(err) })

    }

    const handleInvObjectives = (reminder_id) => {
        //Es ver el id del usuario, y el id de los que lo han aceptado
        //o sea, todos los usuarios quienes han
        setCurrentReminderId(reminder_id);
        setshowObjectivesBlock(true);
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

    const handleInvDelete = (inv_id) => {
        //eliminar el recordatorio por parte del creador
        deleteInvitation(inv_id).then(res => {
            if (res) {
                myPojo.setNotif("Invitacion cancelada", <LuMailX size={220} />)
                fetchInvitations();
            }
        }).catch(err => { console.log(err) })
    }

    return (
        <Container fluid className="invitation-view" >
            <Row className="invitation-cards-container">
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones pendientes"
                        color="#EE7D02"
                        Icon={FaUserFriends}
                        content={pendingInvitations}
                        flag={1}
                        handleInvUsers={handleInvUsers}
                        handleInvAccepted={handleInvAccepted}
                        handleInvRejected={handleInvRejected}
                    />
                </Col>
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones activas"
                        color="#00B85A"
                        Icon={FaUserCheck}
                        flag={2}
                        content={activeInvitations}
                        handleInvUsers={handleInvUsers}
                        handleInvCanceled={handleInvCanceled}
                        handleInvObjectives={handleInvObjectives}
                    />
                </Col>
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones creadas"
                        color="#5368DC"
                        Icon={FaUserPlus}
                        content={createdInvitations}
                        flag={3}
                        handleInvUsers={handleInvUsers}
                        handleInvObjectives={handleInvObjectives}
                        handleInvDelete={handleInvDelete}
                    />
                </Col>
            </Row>
            <CancelReasonModal
                show={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                onSave={handleSaveCancelReason}
            />
            {showObjectivesBlock && <>
            <InvObjectivesBlock 
            />
            </>
            }
            {showUserList && <InvUserList
                inv_id={currentInvId}
                ownerId={CurrentOwner}
                user_id={props.user_id}
                reminderId={CurrentReminderId}
                alarmId={CurrentAlarmId}
                showUserList={showUserList}
                setShowUserList={setShowUserList}
            />}
        </Container>
    );
}
