import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { saveUserReminder } from '../../../utils/validations/reminders';
import '../../../styles/UI/Calendar/Reminder_formCrea.css';

import ObjectiveBlocks from './ObjectivesBlocks';
import ShareUsers from './ShareReminder';
import { addTone } from '../../../utils/validations/tone';
import { saveReminderShare } from '../../../utils/validations/remindershare';
import { saveObjective } from '../../../utils/validations/objetive';
import { saveObjectivesBlock } from '../../../utils/validations/objetiveblock';

const ReminderFormView = (props) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        alarmActive: false,
        repeat: '',
        alarmTone: null,
        name: '',
        duration: 10,
        reminderAdvance: '',
        arrivalPlace: '',
        departurePlace: '',
        image: null,
        description: '',
        snooze: '',
        goalList: [],
        shareUsers: []
    });

    const [reminder, setReminder] = useState([]);
    const [showObjectiveBlocks, setShowObjectiveBlocks] = useState(false);
    const [showShareUsers, setShowShareUsers] = useState(false); 

    useEffect(() => {
        if (props.SelectDate && props.SelectHour !== null && props.SelectHour !== undefined) {
            const updatedDate = props.SelectDate.toISOString().split('T')[0];
            const updatedTime = `${props.SelectHour.toString().padStart(2, '0')}:00`;
            setFormData(prevFormData => ({
                ...prevFormData,
                date: updatedDate,
                time: updatedTime
            }));
        }
    }, [props.SelectHour, props.SelectDate]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const file = files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result.split(',')[1];
                console.log(`File name: ${file.name}`);
                console.log(`File type: ${file.type}`);
                console.log(`Base64 string: ${base64String}`);
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: base64String,
                    [`${name}Name`]: file.name, // Store the file name
                    [`${name}Type`]: file.type // Store the file type
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleObjectiveBlocksChange = (objectiveBlocks) => {
        setFormData((prevData) => ({
            ...prevData,
            goalList: objectiveBlocks
        }));
    };

    const handleAddUser = (user) => {
        
        setFormData((prevData) => ({
            ...prevData,
            shareUsers: [...prevData.shareUsers, user]
        }));
    };

    const handleRemoveUser = (name) => {
        setFormData((prevData) => ({
            ...prevData,
            shareUsers: prevData.shareUsers.filter(user => user.name !== name)
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const saveTone = formData.alarmTone ? addTone(formData) : Promise.resolve({ data: { tone_id: null } });

        saveTone.then(response => {
            console.log('Tone added successfully:', response);
            const { tone_id } = response;

            const { hours, minutes } = convertTimeString(formData.time);

            console.log('Datos del formulario:', formData);
            console.log("goal list", formData.goalList);
            console.log("el id del usuario es:", props.user_id);

            const reminder = {
                reminder_name: formData.name,
                reminder_date: formData.date,
                reminder_hour: hours,
                reminder_min: minutes,
                reminder_active: formData.alarmActive,
                reminder_tone_duration_sec: formData.duration,
                reminder_advance_min: parseInt(formData.reminderAdvance, 10), // Cast to integer
                reminder_img: formData.image, // Replace this with the actual image data if necessary
                reminder_desc: formData.description,
                reminder_days_suspended: parseInt(formData.snooze, 10), // Cast to integer
                reminder_share: 0,
                tone_id: tone_id, // Use the tone_id from the response
                user_id: props.user_id
            };

            saveUserReminder(reminder).then(response => {
                console.log("respuesta al guardar reminder:", response);
                const { reminder_id } = response.data;

                //TEMPORAL
                /*
                const remindershare = {
                    rs_user_id_target: props.user_id,
                    reminder_id: reminder_id
                      saveReminderShare(remindershare).then(response => {
                    console.log("Reminder share saved successfully");

                };
*/
                if (formData.goalList.length > 0) {
                    formData.goalList.forEach(goal => {
                        const objectiveBlockData = {
                            objblo_name: goal.name,
                            reminder_id: reminder_id,
                        };

                        saveObjectivesBlock(objectiveBlockData).then(response => {
                            const { objblo_id } = response.data;
                            console.log("Objective block saved:", response.data);

                            goal.objectives.forEach(objective => {
                                const goalData = {
                                    obj_name: objective,
                                    obj_duration_min: goal.time, // Assuming time represents duration here
                                    obj_durationreal_min: 0,
                                    obj_check: false, // Adjust this value based on your needs
                                    objblo_id: objblo_id,
                                    id_user: props.user_id,
                                };

                                saveObjective(goalData).then(response => {
                                    console.log("Objective saved:", response.data);
                                }).catch(error => {
                                    console.error("Error saving objective", error);
                                });
                            });
                        }).catch(error => {
                            console.error("Error saving objective block", error);
                        });
                    });
                }
            }).catch(error => {
                console.error("Error saving reminder share", error);
            });
        }).catch(error => {
            console.error("Error saving reminder", error);
        });

    };

    //Utils
    function convertTimeString(timeString) {
        console.log(timeString.split(':').map(Number));
        const [hours, minutes] = timeString.split(':').map(Number);
        return { hours, minutes };
    }

    return (
       <div>
         <div className="reminder-view-container">
            <div className="reminder-view">
                <div className="reminder-view-header">
                    <h2 className="reminder-title">Configurar Recordatorio</h2>
                    <button className="reminders-close-button" onClick={props.showform}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <Container fluid className="reminder-view">
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Cambiar Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            maxLength={20}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="formDate">
                                        <Form.Label>Asignar Fecha</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="formTime">
                                        <Form.Label>Asignar Hora</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="formArrivalPlace">
                                        <Form.Label>Asignar Lugar de Llegada</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="arrivalPlace"
                                            value={formData.arrivalPlace}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="formDeparturePlace">
                                        <Form.Label>Asignar Lugar de Salida</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="departurePlace"
                                            value={formData.departurePlace}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <div className="map-placeholder" style={{ height: '200px', backgroundColor: '#f0f0f0', margin: '1rem 0' }}>
                                        <p>Mapa aquí</p>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="formAlarmActive">
                                        <Form.Check
                                            type="checkbox"
                                            label="Activar Alarma"
                                            name="alarmActive"
                                            checked={formData.alarmActive}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="formRepeat">
                                        <Form.Label>Asignar Repetición</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="repeat"
                                            value={formData.repeat}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="formDuration">
                                        <Form.Label>Duración del Timbre</Form.Label>
                                        <Form.Control
                                            type="range"
                                            name="duration"
                                            min={1}
                                            max={30}
                                            value={formData.duration}
                                            onChange={handleChange}
                                        />
                                        <div className="duration-value">{formData.duration} segundos</div>
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="formReminderAdvance">
                                        <Form.Label>Antelación de Recordatorio</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="reminderAdvance"
                                            value={formData.reminderAdvance}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={6}>
                                    <Form.Group controlId="formAlarmTone">
                                        <Form.Label>Configurar Tono de Alarma</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="alarmTone"
                                            accept=".mp3"
                                            onChange={handleFileChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={6}>
                                    <Form.Group controlId="formImage">
                                        <Form.Label>Agregar Imagen</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Agregar Descripción</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            maxLength={300}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <Form.Group controlId="formSnooze">
                                        <Form.Label>Posponer por un Periodo de Tiempo (días)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="snooze"
                                            value={formData.snooze}
                                            onChange={handleChange}
                                            min={0}
                                            max={7}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col xs={12}>
                                    <Button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowObjectiveBlocks(true)}
                                    >
                                        Lista de Objetivos
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                    <div className="form-actions">
                        <Button type="button" className="btn btn-secondary" onClick={() => setShowShareUsers(showShareUsers => !showShareUsers)}>
                            Compartir
                        </Button>

                        <Button type="submit" className="btn btn-primary" >
                            Guardar
                        </Button>

                    </div>
                </form>
                {showObjectiveBlocks && (
                    <ObjectiveBlocks
                        initialBlocks={formData.goalList}
                        onSave={handleObjectiveBlocksChange}
                        onClose={() => setShowObjectiveBlocks(false)}
                    />
                )}
               {(showShareUsers && !showObjectiveBlocks) && (
                   <ShareUsers
                       onAddUser={handleAddUser}
                       onRemoveUser={handleRemoveUser}
                       userList={formData.shareUsers}
                   />
               )}
            </div>
        </div>
       </div>
    );
};

export default ReminderFormView;
