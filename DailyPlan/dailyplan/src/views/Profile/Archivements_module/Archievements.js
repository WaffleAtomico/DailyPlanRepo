import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { getAllArchivements, grantArchivement } from '../../../utils/archivements/grantArchivement';

import { FaTrophy } from 'react-icons/fa';
import { MdOutlineTimer10Select, MdOutlineTimer3Select, MdOutlineTimelapse, MdDomainVerification } from "react-icons/md";
import { TbNumber29Small, TbClockCheck } from "react-icons/tb";
import { TiGroup } from "react-icons/ti";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaSlideshare, FaListCheck, FaHourglassStart } from "react-icons/fa6";
import { GiTomato } from "react-icons/gi";
import { BsCalendarWeek, BsClockHistory } from "react-icons/bs";
import { GoGear } from "react-icons/go";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/UI/profile/archivementView.css';
import { myPojo } from '../../../utils/ShowNotifInfo';


export default function Archivement_view(props) {
    const sizeicon = 100;
    const additionalFields = {
        1: { description: "Obten una puntuacion mayor de 80 en puntualidad", image: <TbNumber29Small size={sizeicon} /> },
        2: { description: "Obten una puntuacion mayor de 90 en puntualidad", image: <MdOutlineTimer10Select size={sizeicon} /> },
        3: { description: "Obten una puntuacion mayor de 95 en puntualidad", image: <MdOutlineTimer3Select size={sizeicon} /> },
        4: { description: "Acepta una invitacion de un recordatorio compartido", image: <TiGroup size={sizeicon} /> },
        5: { description: "Notifica que llegarás tarde", image: <IoAlertCircleOutline size={sizeicon} /> },
        6: { description: "Gana en alguna categoría de competición durante un recordatorio compartido", image: <FaTrophy size={sizeicon} /> },
        7: { description: "Comparte una alarma con otro usuario", image: <FaSlideshare size={sizeicon} /> },
        8: { description: "Completa un ciclo pomodoro", image: <GiTomato size={sizeicon} /> },
        9: { description: "Completa tu primer grupo de objetivos", image: <FaListCheck size={sizeicon} /> },
        10: { description: "Completa todas tus actividades a tiempo teniendo activa la preparación", image: <MdOutlineTimelapse size={sizeicon} /> },
        11: { description: "No dejes que baje tu puntualidad por una semana", image: <BsCalendarWeek size={sizeicon} /> },
        12: { description: "Crea un recordatorio compartido e invita otros usuarios", image: <MdDomainVerification size={sizeicon} /> },
        13: { description: "Cambia tu titulo desde configuración", image: <GoGear size={sizeicon} /> },
        14: { description: "Agrega un nuevo reloj", image: <TbClockCheck size={sizeicon} /> },
        15: { description: "Guarda un cronómetro con al menos 5 marcas de tiempo", image: <BsClockHistory size={sizeicon} /> },
        16: { description: "Obten todos los logros", image: <FaHourglassStart size={sizeicon} /> },
    };

    const [titlesfromuser, setTitlesfromuser] = useState([]);
    const [allAchievementsDone, setAllAchievementsDone] = useState(false);

    useEffect(() => {
        const getUserArchivement = (user_id) => {
            getAllArchivements(user_id).then(response => {
                const gettitles = response.data;
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
                // console.log("Titulos chidos: ", updatedTitles);
               
                // setTitlesfromuser(updatedTitles);
                if (checkAllAchievementsDone(updatedTitles) && updatedTitles[15].title_done ==0) {
                    console.log("No completado");
                    grant16Archivement(user_id);
                }
                
            }).catch(error => {
                console.error(error);
            });
        };
        // console.log("Entre")
        getUserArchivement(props.user_id);
    }, [props.user_id]);

    const checkAllAchievementsDone = (achievements) => {
        const allExceptOneDone = achievements
        .filter((_, index) => index !== 15) 
        .every(achievement => achievement.title_done); 
        // console.log(allExceptOneDone);
        return allExceptOneDone;
    };

    const grant16Archivement = (user_id) => {
        grantArchivement(user_id, 16).then(response => { 
            myPojo.setNotif("Logro: Rey del Tiempo", <FaHourglassStart size={220}/>)
        }).catch(error => {
            console.error("Error granting achievement:", error);
        });
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
