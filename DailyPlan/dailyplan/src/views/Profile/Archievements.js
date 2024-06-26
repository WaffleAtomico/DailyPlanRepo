import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { FaTrophy } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/UI/profile/archivementView.css';
import { getAllArchivements, grantArchivement } from '../../utils/archivements/grantArchivement';

export default function Archivement_view(props) {
    const additionalFields = {
        1: { description: "Obten una puntuacion mayor de 80 en puntualidad", image: "image1.png" },
        2: { description: "Obten una puntuacion mayor de 90 en puntualidad", image: "image2.png" },
        3: { description: "Obten una puntuacion mayor de 95 en puntualidad", image: "image2.png" },
        4: { description: "Acepta una invitacion de un recordatorio compartido", image: "image2.png" },
        5: { description: "Notifica que llegarás tarde", image: "image2.png" },
        6: { description: "Gana en alguna categoría de competición durante un recordatorio compartido", image: "image2.png" },
        7: { description: "Comparte una alarma con otro usuario", image: "image2.png" },
        8: { description: "Completa un ciclo pomodoro", image: "image2.png" },
        9: { description: "Completa tu primer grupo de objetivos", image: "image2.png" },
        10: { description: "Completa todas tus actividades a tiempo teniendo activa la preparación", image: "image2.png" },
        11: { description: "No dejes que baje tu puntualidad por una semana", image: "image2.png" },
        12: { description: "Crea un recordatorio compartido e invita otros usuarios", image: "image2.png" },
        13: { description: "Cambia tu titulo des configuración", image: "image2.png" },
        14: { description: "Agrega un nuevo reloj", image: "image2.png" },
        15: { description: "Guarda un cronómetro con al menos 5 marcas de tiempo", image: "image2.png" },
        16: { description: "Obten todos los logros", image: "image2.png" },
    };

    const [titlesfromuser, setTitlesfromuser] = useState([]);
    const [allAchievementsDone, setAllAchievementsDone] = useState(false);

    useEffect(() => {
        const getUserArchivement = async (user_id) => {
            try {
                const gettitles = await getAllArchivements(user_id);
                const updatedTitles = gettitles.map(title => {
                    if (additionalFields[title.title_id]) {
                        return {
                            ...title,
                            ...additionalFields[title.title_id]
                        };
                    }
                    return title;
                });
                setTitlesfromuser(updatedTitles);
                
                if (checkAllAchievementsDone(updatedTitles)) {
                    console.log("Cumple la condición");
                    await grant16Archivement(user_id);
                }

            } catch (error) {
                console.error("Error fetching titles:", error);
            }
        };

        getUserArchivement(props.user_id);
    }, [props.user_id]);

    useEffect(() => {
        if (titlesfromuser.length > 0) {
            console.log("Titles from user", titlesfromuser[0].title_id);
            console.log("Titles from user", titlesfromuser[0].title_name);
            console.log("Titles from user", titlesfromuser[0].title_done);
        }
    }, [titlesfromuser]);

    const checkAllAchievementsDone = (achievements) => {
        return achievements.every(achievement => achievement.title_done);
    };

    const grant16Archivement = async (user_id) => {
        try {
            await grantArchivement(user_id, 16);
        } catch (error) {
            console.error("Error granting achievement:", error);
        }
    };
    
    return (
        <Container fluid className="archivement-view">
            <h2 className="text-center">Logros</h2>
            <Row>
                {titlesfromuser.map((achievement) => (
                    <Col key={achievement.title_id} xs={6} sm={4} md={2}>
                        <Card className={`achievement-card ${achievement.title_done ? 'achieved' : 'unachieved'}`}>
                            <Card.Img variant="top" src={achievement.image} className="image-no-bg" />
                            <Card.Body>
                                <Card.Title>{achievement.title_name}</Card.Title>
                                <Card.Text>{achievement.description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
