import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { saveUserReminder } from '../../../utils/validations/reminders';
import '../../../styles/UI/Calendar/Reminder_formCrea.css';

import ObjectiveBlocks from './ObjectivesBlocks';
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
        goalList: []
    });

    const [reminder, setReminder] = useState([]);
      
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
        const file = files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result.split(',')[1];
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
    const handleSubmit = (event) => {
        event.preventDefault();
    
        //--------------------------------------
        // Almacenar el tono en la base de datos
        //--------------------------------------
    /*
        const tone = {
            tone_name: formData.alarmToneName,
            tone_location: formData.alarmTone,
            tone_type: formData.alarmToneType // If you need to store the type as well
        };
    
        addTone(tone).then(response => {
            console.log('Tone added successfully:', response.data);
        }).catch(error => {
            console.log('Error adding tone:', error);
        });
    */

        //--------------------------------------
        //Almacenar recordatorio

        
        //tiempo
        const {hours,  minutes} = convertTimeString(formData.time);

        const reminder = {

            reminder_name: formData.name,
            reminder_date: formData.date,
            reminder_hour: hours,
            reminder_min: minutes,
            reminder_tone_duration_sec: formData.duration,
            reminder_advance_min: formData.reminderAdvance,
            reminder_img: formData.image,
            reminder_desc: formData.description,
            reminder_days_suspended: formData.snooze,
            reminder_share: 0,
        
            
        }


    // Save the reminder
saveUserReminder(reminder).then(
    response => {
      // Obtain the reminder_id
      const { reminder_id } = response.data;

        //Save the reminder share. for this case, the first time is save with the user creator
        const remindershare = {
            rs_user_id_target: props.user_id,
            reminder_id: reminder_id
        }

        
    saveReminderShare(remindershare).then(response => {console.log("se guardo el compartido". response.data)})
    .catch(error => {console.log("Acaba de ocurrir un problema:", error)})
  
      // Iterate through the goalList to save each goal
      formData.goalList.forEach(goal => {

   // Create the object for objective block
   const objectiveBlockData = {
    objblo_id: goal.blockId,
    objblo_name: goal.blockName,
    reminder_id: reminder_id,
  };

  // Save the objective block
  saveObjectivesBlock(objectiveBlockData).then(response => {
    console.log("Objective block saved:", response.data);


    const goalData = {
         
        obj_name: goal.name,
        obj_duration_min: goal.durationMin,
        obj_durationreal_min: goal.durationRealMin,
        obj_check: goal.check,
        objblo_id: response.data.objblo_id,
        id_user: props.id_user,
      };

      // Save the objective
      saveObjective(goalData).then(response => {
        console.log("Objective saved:", response.data);
      }).catch(error => {
        console.error("Error saving objective", error);
      });

  }).catch(error => {
    console.error("Error saving objective block", error);
  });

       
     
      });
    }
  ).catch(error => {
    console.error("Hubo un error", error);
  });

        // Rest of your form submission logic
        console.log('Datos del formulario:', formData);
        console.log("goal list", formData.goalList);
        /*
        Campos dependientes de otras tablas
        Repdaysid  se obtiene de distintos dias con un mismo id, pero el recordatorio obtiene ese id antes
        locations se pobla una vez que existe un id del recordatorio
        Bloque de objetivos de pobla una vez que ya existe un recordatorio
        XXXX -Reminder share se pobla una vez creado el recordatorio (y luego una invitacion)
        Objectives se pobla una vez creado el bloque de objetivos
        */

    };



    //Utils
    function convertTimeString(timeString) {
        const [minutes, seconds] = timeString.split(':').map(Number);
        return { minutes, seconds };
      }

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
                        <Button type="submit" className="btn btn-primary" >
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
