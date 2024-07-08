import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUserFriends, FaUserCheck, FaUserPlus } from 'react-icons/fa';
import InvitationCard from './invitation_card';

import '../../../styles/UI/Invitations/invitation_view.css';


export default function Invitation_view() {

    const [invitations, setInvitations] = useState([
        {
            name: 'Invitaciones pendientes',
            color: '#EE7D02',
            icon: FaUserFriends,
            content: [
                'Invitación 1',
                'Invitación 2',
                'Invitación 3',
                'Invitación 4',
                'Invitación 5',
            ],
        },
        {
            name: 'Invitaciones activas',
            color: '#00B85A',
            icon: FaUserCheck,
            content: [
                'Invitación activa 1',
                'Invitación activa 2',
                'Invitación activa 3',
            ],
        },
        {
            name: 'Invitaciones creadas',
            color: '#5368DC',
            icon: FaUserPlus,
            content: [
                'Invitación creada 1',
                'Invitación creada 2',
                'Invitación creada 3',
                'Invitación creada 4',
            ],
        },
    ]);

    return (
        <Container fluid className="invitation-view">
            <Row className="invitation-cards-container">
                {invitations.map((invitation, index) => (
                    <Col key={index} xs={12} className="invitation-card-container">
                        <InvitationCard
                            name={invitation.name}
                            color={invitation.color}
                            Icon={invitation.icon}
                            content={invitation.content}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}