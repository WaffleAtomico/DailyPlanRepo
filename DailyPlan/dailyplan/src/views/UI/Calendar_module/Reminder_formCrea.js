// ReminderFormView.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../../styles/UI/Calendar/Reminder_formCrea.css';

const ReminderFormView = (props) => {

    console.log("Entre");

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
        share: false,
        image: null,
        description: '',
        snooze: '',
        goalList: ''
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0]
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes agregar la lógica para enviar los datos al servidor
        console.log('Datos del formulario:', formData);
    };

    return (
        <div className="reminder-view-container">
            <div className="reminder-view">
                <div className="reminder-view-header">
                    <h2 className="reminder-title">Configurar Recordatorio</h2>
                    <button className="close-button" onClick={props.showform}>X</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <Container fluid className="reminder-view">
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="formReminderAdvance">
                                        <Form.Label>Antelación de Recordatorio</Form.Label>
                                        <Form.Control
                                            type="time"
                                            name="reminderAdvance"
                                            value={formData.reminderAdvance}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
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
                                    <Form.Group controlId="formShare">
                                        <Form.Check
                                            type="checkbox"
                                            label="Compartir"
                                            name="share"
                                            checked={formData.share}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
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
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="formSnooze">
                                        <Form.Label>Posponer por un Periodo de Tiempo</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="snooze"
                                            value={formData.snooze}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Form.Group controlId="formGoalList">
                                        <Form.Label>Lista de Objetivos</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="goalList"
                                            value={formData.goalList}
                                            onChange={handleChange}
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

export default ReminderFormView;
