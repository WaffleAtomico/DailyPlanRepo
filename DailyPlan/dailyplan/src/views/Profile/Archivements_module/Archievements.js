import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { getAllArchivements, grantArchivement } from '../../../utils/archivements/grantArchivement';

import { FaTrophy } from 'react-icons/fa';
import { MdOutlineTimer10Select, MdOutlineTimer3Select, MdOutlineTimelapse, MdDomainVerification    } from "react-icons/md";
import { TbNumber29Small, TbClockCheck  } from "react-icons/tb";
import { TiGroup } from "react-icons/ti";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaSlideshare, FaListCheck, FaHourglassStart   } from "react-icons/fa6";
import { GiTomato } from "react-icons/gi";
import { BsCalendarWeek, BsClockHistory  } from "react-icons/bs";
import { GoGear } from "react-icons/go";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/UI/profile/archivementView.css';


export default function Archivement_view(props) {
    const sizeicon = 100;
    const additionalFields = {
        1: { description: "Obten una puntuacion mayor de 80 en puntualidad", image: <TbNumber29Small size={sizeicon}/> },
        2: { description: "Obten una puntuacion mayor de 90 en puntualidad", image: <MdOutlineTimer10Select size={sizeicon}/> },
        3: { description: "Obten una puntuacion mayor de 95 en puntualidad", image: <MdOutlineTimer3Select size={sizeicon}/> },
        4: { description: "Acepta una invitacion de un recordatorio compartido", image: <TiGroup  size={sizeicon}/> },
        5: { description: "Notifica que llegarás tarde", image:<IoAlertCircleOutline  size={sizeicon}/> },
        6: { description: "Gana en alguna categoría de competición durante un recordatorio compartido", image:<FaTrophy  size={sizeicon}/> },
        7: { description: "Comparte una alarma con otro usuario", image:<FaSlideshare  size={sizeicon}/> },
        8: { description: "Completa un ciclo pomodoro", image:<GiTomato  size={sizeicon}/> },
        9: { description: "Completa tu primer grupo de objetivos", image:<FaListCheck  size={sizeicon}/> },
        10: { description: "Completa todas tus actividades a tiempo teniendo activa la preparación", image:<MdOutlineTimelapse   size={sizeicon}/> },
        11: { description: "No dejes que baje tu puntualidad por una semana", image:<BsCalendarWeek  size={sizeicon}/> },
        12: { description: "Crea un recordatorio compartido e invita otros usuarios", image:<MdDomainVerification  size={sizeicon}/> },
        13: { description: "Cambia tu titulo des configuración", image:<GoGear  size={sizeicon}/> },
        14: { description: "Agrega un nuevo reloj", image:<TbClockCheck  size={sizeicon}/> },
        15: { description: "Guarda un cronómetro con al menos 5 marcas de tiempo", image:<BsClockHistory  size={sizeicon}/> },
        16: { description: "Obten todos los logros", image:<FaHourglassStart  size={sizeicon}/> },
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
                            {/* <Card.Img variant="top" src={achievement.image} className="image-no-bg"/> */}
                            <div className="achievement-icon-container">{achievement.image}</div>
                            {/* {achievement.image} */}
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
