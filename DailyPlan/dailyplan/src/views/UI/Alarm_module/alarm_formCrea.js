// AlarmView.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaRegCalendarAlt, FaRegBell, FaRegImage } from 'react-icons/fa';
import { addAlarm } from "../../../utils/validations/alarm";
import { addDaySelected } from "../../../utils/validations/dayselected";
import '../../../styles/UI/Alarm/alarm_formCrea.css';

const AlarmFormView = (props) => {
    const [alarmTime, setAlarmTime] = useState('');
    const [repeatDays, setRepeatDays] = useState([]);
    const [reminderTime, setReminderTime] = useState('');
    const [alarmSound, setAlarmSound] = useState(null);
    const [alarmName, setAlarmName] = useState('');
    const [alarmDuration, setAlarmDuration] = useState(10);
    const [alarmRepetition, setAlarmRepetition] = useState(3);
    const [suspensionDays, setSuspensionDays] = useState(0);
    const [alarmImage, setAlarmImage] = useState(null);
    const [alarmDescription, setAlarmDescription] = useState('');

    const handleAlarmTimeChange = (event) => {
        setAlarmTime(event.target.value);
    };

    const handleRepeatDayChange = (day) => {
        if (repeatDays.includes(day)) {
            setRepeatDays(repeatDays.filter((d) => d !== day));
        } else {
            setRepeatDays([...repeatDays, day]);
        }
    };

    const handleReminderTimeChange = (event) => {
        setReminderTime(event.target.value);
    };

    const handleAlarmSoundChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setAlarmSound(file);
        } else {
            alert('El archivo de sonido no debe exceder los 5 MB.');
        }
    };

    const handleAlarmNameChange = (event) => {
        setAlarmName(event.target.value);
    };

    const handleAlarmDurationChange = (event) => {
        setAlarmDuration(event.target.value);
    };

    const handleAlarmRepetitionChange = (event) => {
        setAlarmRepetition(event.target.value);
    };

    const handleSuspensionDaysChange = (event) => {
        setSuspensionDays(event.target.value);
    };

    const handleAlarmImageChange = (event) => {
        const file = event.target.files[0];
        setAlarmImage(file);
    };

    const handleAlarmDescriptionChange = (event) => {
        setAlarmDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const days_select = 0

        addDaySelected(repeatDays).then(response => {
            days_select = response.data.id
        }).catch(error => {
            console.error(error);
        });

        const alarmInfoToSend = {
            alarm_name: alarmName,
            daysel_id: days_select,
            alarm_hour: 11,
            alarm_min: 11,
            alarm_sec: 0,
            alarm_rep_tone: 1,
            tone_id: 1,
            alarm_days_suspended: suspensionDays,
            alarm_active: 1,
            alarm_image: alarmImage,
            alarm_desc: alarmDescription,
            user_id: props.user_id
          };

        addAlarm(alarmInfoToSend).then(() => {
        }).catch(error => {
            console.error(error);
        });

        console.log('Datos del formulario:', {
            alarmTime,
            reminderTime,
            alarmSound,
            alarmDuration,
            alarmRepetition
        });
    };

    return (
        <div className="alarm-view-container" >
            <div className="alarm-view">
                <div className="alarm-view-header">
                    <h2 className="alarm-title">Configurar Alarma</h2>
                    <button className="close-button" onClick={() => props.setVisibilty()} >X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <Container fluid className="alarm-view">
                        {/* <Row>
                            <Col>
                                <h2 className="alarm-title">Configurar Alarma</h2>
                            </Col>
                        </Row> */}
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="alarmName">
                                        <Form.Label>Cambiar Nombre</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={alarmName}
                                            onChange={handleAlarmNameChange}
                                            maxLength={20}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} sm={6}>
                                    <div className="repeat-days-container">
                                        <table className="repeat-days-table">
                                            <thead>
                                                <tr>
                                                    {['L', 'M', 'Mi', 'J', 'V', 'S', 'D'].map((day, index) => (
                                                        <th key={index}>{day}</th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    {['L', 'M', 'Mi', 'J', 'V', 'S', 'D'].map((day, index) => (
                                                        <td key={index}>
                                                            <Form.Check
                                                                type="checkbox"
                                                                checked={repeatDays.includes(day)}
                                                                onChange={() => handleRepeatDayChange(day)}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                            <Row>


                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="alarmTime">
                                        <Form.Label>*Asignar Tiempo</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={alarmTime}
                                            onChange={handleAlarmTimeChange}
                                            max="23:59"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="alarmSound">
                                        <Form.Label>Asignar Sonido del Timbre</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept=".mp3"
                                            onChange={handleAlarmSoundChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="reminderTime">
                                        <Form.Label>Antelación de Recordatorio</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={reminderTime}
                                            onChange={handleReminderTimeChange}
                                            max="23:59"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="alarmDuration">
                                        <Form.Label>Duración del Timbre</Form.Label>
                                        <Form.Control
                                            type="range"
                                            min={1}
                                            max={30}
                                            value={alarmDuration}
                                            onChange={handleAlarmDurationChange}
                                        />
                                        <div className="duration-value">{alarmDuration} segundos</div>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="alarmRepetition">
                                        <Form.Label>Repetición de Timbre</Form.Label>
                                        <Form.Control
                                            type="range"
                                            min={1}
                                            max={10}
                                            value={alarmRepetition}
                                            onChange={handleAlarmRepetitionChange}
                                        />
                                        <div className="repetition-value">{alarmRepetition} veces</div>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="suspensionDays">
                                        <Form.Label>Suspensión Temporal de Alarma</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={suspensionDays}
                                            onChange={handleSuspensionDaysChange}
                                            max={7}
                                            min={0}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="alarmImage">
                                        <Form.Label>Agregar Imagen</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            onChange={handleAlarmImageChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="alarmDescription">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={alarmDescription}
                                            onChange={handleAlarmDescriptionChange}
                                            maxLength={300}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                        <button type="button" className="btn btn-secondary">
                            Compartir
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AlarmFormView;