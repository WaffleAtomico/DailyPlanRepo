import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserFriends, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import InvitationCard from './invitation_card';

import '../../../styles/UI/Invitations/invitation_view.css';
import { getInvitationByUser } from '../../../utils/validations/invitation';

export default function InvitationView(props) {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Function to fetch invitations from the API
        const fetchInvitations = () => {
            getInvitationByUser(parseInt(props.user_id, 10))
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('Error fetching invitations:', error);
                });
        };

        fetchInvitations();
    }, [props.user_id]); // Add props.user_id as a dependency

    return (
        <Container fluid className="invitation-view">
            <Row className="invitation-cards-container">
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones pendientes"
                        color="#EE7D02"
                        Icon={FaUserFriends}
                        content={data.filter(invitation => invitation.state !== 1 
                            && invitation.user_id_owner != parseInt(props.user_id, 10))}
                        flag={1}
                    />
                </Col>
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones activas"
                        color="#00B85A"
                        Icon={FaUserCheck}
                        content={data.filter(invitation => invitation.state === 1 
                            && invitation.user_id_owner != parseInt(props.user_id, 10))}
                        flag={2}
                    />
                </Col>
                <Col xs={12} className="invitation-card-container">
                    <InvitationCard
                        name="Invitaciones creadas"
                        color="#5368DC"
                        Icon={FaUserPlus}
                        content={data.filter(invitation => invitation.user_id_owner === parseInt(props.user_id, 10))}
                        flag={3}
                    />
                </Col>
            </Row>
        </Container>
    );
}
