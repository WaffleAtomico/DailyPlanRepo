import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserFriends, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import InvitationCard from './invitation_card';
import { getInvitationByUser } from '../../../utils/validations/invitation';
import { myPojo } from '../../../utils/ShowNotifInfo';

import '../../../styles/UI/Invitations/invitation_view.css';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';
import { TiGroup } from 'react-icons/ti';


export default function InvitationView(props) {
    const [data, setData] = useState([]);
    const [isCompletedArchivement, setIsCompletedArchivement] = useState(true);

    useEffect(() => {
        confirmArchivement(props.id_user);
    }, [props.id_user]);

    useEffect(() => {
        // Function to fetch invitations from the API
        const fetchInvitations = () => {
            getInvitationByUser(parseInt(props.user_id, 10))
                .then(response => {
                    if (data) {
                        setData(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching invitations:', error);
                });
        };

        fetchInvitations();
    }, [props.user_id]);

    const confirmArchivement = (user_id) => {
        const grant_title_id = 3;
        isCompleted(user_id, grant_title_id).then(response => {
            console.log("IsCompleted", response);
            if (response == false) {
                console.log("Si es falso?", response)
                setIsCompletedArchivement(response);
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



    return (
        <Container fluid className="invitation-view">
            <Row className="invitation-cards-container">
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones pendientes"
                        color="#EE7D02"
                        Icon={FaUserFriends}
                        content={data ? data.filter(invitation => invitation.state !== 1
                            && invitation.user_id_owner != parseInt(props.user_id, 10)) : []}
                        flag={1}
                        grant4Archivement ={grant4Archivement}
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
                    />
                </Col>
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones creadas"
                        color="#5368DC"
                        Icon={FaUserPlus}
                        content={data ? data.filter(invitation => invitation.state !== 1 && invitation.user_id_owner !== parseInt(props.user_id, 10)) : []}
                        flag={3}
                    />
                </Col>
            </Row>
        </Container>
    );
}
