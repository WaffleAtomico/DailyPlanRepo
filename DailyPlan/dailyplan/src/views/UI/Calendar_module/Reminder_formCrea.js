import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../../../styles/UI/Calendar/Reminder_formCrea.css';
import ObjectiveBlocks from './ObjectivesBlocks';

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
        goalList: []
    });
      
    const [showObjectiveBlocks, setShowObjectiveBlocks] = useState(false);

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
        setFormData((prevData) => ({
            ...prevData,
            [name]: files[0]
        }));
    };

    const handleObjectiveBlocksChange = (objectiveBlocks) => {
        setFormData((prevData) => ({
            ...prevData,
            goalList: objectiveBlocks
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Datos del formulario:', formData);
        console.log("goal list", formData.goalList)

        /*
        Campos dependientes de otras tablas
        Repdaysid  se obtiene de distintos dias con un mismo id, pero el recordatorio obtiene ese id antes
        locations se pobla una vez que existe un id del recordatorio
        Bloque de objetivos de pobla una vez que ya existe un recordatorio
        XXXX -Reminder share se pobla una vez creado el recordatorio (y luego una invitacion)
        Objectives se pobla una vez creado el bloque de objetivos
        */

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
                                            type="time"
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
                            <br/>
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
                        <Button type="submit" className="btn btn-primary">
                            Guardar
                        </Button>
                        <Button type="button" className="btn btn-secondary">
                            Compartir
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
            </div>
        </div>
    );
};

export default ReminderFormView;
