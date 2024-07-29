import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { saveUserReminder, getReminderById, deleteReminder } from '../../../utils/validations/reminders';
import '../../../styles/UI/Calendar/Reminder_formCrea.css';
import { IoTrashSharp } from "react-icons/io5";
import { Alert } from 'react-bootstrap';
import ObjectiveBlocks from './ObjectivesBlocks';
import ShareUsers from './ShareReminder';
import { addTone } from '../../../utils/validations/tone';
import { saveReminderShare } from '../../../utils/validations/remindershare';
import { saveObjective } from '../../../utils/validations/objetive';
import { saveObjectivesBlock } from '../../../utils/validations/objetiveblock';
import MapView from '../Map_module/MapView';
import { getDistanceTimeMatrix } from '../../../utils/validations/services/distanceMatrixClient';
import { addNewEvent, addSchedule, checkScheduleConflict, findConflictEvent } from '../../../utils/validations/schedule';
import { myPojo } from '../../../utils/ShowNotifInfo';
import { getPermissionById } from '../../../utils/validations/permission';
import { addInvitation } from '../../../utils/validations/invitation';
import { addLocation } from '../../../utils/validations/location';
import { checkIfUserBlocked } from '../../../utils/validations/blockedurs';


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
    const [arrivalLatLng, setArrivalLatLng] = useState([null, null]);
    const [departureLatLng, setDepartureLatLng] = useState([null, null]);


    const [Transport, setTransport] = useState('driving');
    const [permission, setPermission] = useState(null);
    const [active, setActive] = useState(false);
    const [result, setResult] = useState({
        distance: { text: "", value: 0 },
        duration: { text: "", value: 0 }
    });

    useEffect(() => {
        if (!(props.Reminder_id)) //la info la vamos a obtener cuando no tenga el reminder_id o sea nulo
        {
            console.log(props.SelectDate);
            if (props.SelectDate && props.SelectHour !== null && props.SelectHour !== undefined) {
                const updatedDate = props.SelectDate.toISOString().split('T')[0];
                const updatedTime = `${props.SelectHour.toString().padStart(2, '0')}:00`;
                setFormData(prevFormData => ({
                    ...prevFormData,
                    date: updatedDate,
                    time: updatedTime
                }));
            }
        }
    }, [props.SelectHour, props.SelectDate]);


    useEffect(() => {

        getPermissionById(props.user_id).then(response => {
            console.log("El permiso es:", response);

            if (response !== null && response.length > 0) {
                if (response[0].permision_active === 1) {
                    console.log("Se encuentra activo");
                    setActive(true);
                } else {
                    console.log("No se encuentra activo");
                    setActive(false);
                }
            } else {
                console.log("El array está vacío o es nulo");
                setActive(false);
            }

        }).catch(console.log("No se pudieron obtener los permisos"));

    }, [props.user_id]);

    useEffect(() => { //Si en invitaciones se puede editar, entonces se va a editar
        const fetchReminderData = (id) => {

            getReminderById(id).then(response => {
                // Asigna valores al objeto formData
                const dataRem = response.data[0];
                console.log(dataRem);

                const formattedData = {
                    date: dataRem.reminder_date || '2024-07-19',
                    time: `${dataRem.reminder_hour}:${dataRem.reminder_min}` || '14:00',
                    alarmActive: dataRem.reminder_active !== undefined ? dataRem.reminder_active : true,
                    repeat: dataRem.repdays_id || '',
                    alarmTone: dataRem.alarmTone || null,
                    name: dataRem.reminder_name || 'Recordatorio de prueba',
                    duration: dataRem.reminder_tone_duration_sec || 10,
                    reminderAdvance: dataRem.reminder_advance_min || '5',
                    arrivalPlace: dataRem.arrivalPlace || 'Lugar de llegada',
                    departurePlace: dataRem.departurePlace || 'Lugar de salida',
                    image: dataRem.reminder_img || null,
                    description: dataRem.reminder_desc || 'Descripción de prueba',
                    snooze: dataRem.reminder_days_suspended || '1',
                    goalList: dataRem.goalList || [],
                    shareUsers: dataRem.shareUsers || []
                };

                // setFormData(formattedData);
            }).catch(err => { console.log(err) });

        };

        if (props.Reminder_id) {
            fetchReminderData(props.Reminder_id); //una vez obtenida la info se reinicia
        }
    }, [props.Reminder_id]);



    //función para verificar los cambios a los campos.
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const updatedValue = type === 'checkbox' ? checked : value;
    
        // Get current date and time
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to the beginning of the day
    
        // Validation logic for date
        if (name === 'date') {
            const selectedDate = new Date(value);
    
            if (selectedDate < today) {
                myPojo.setNotif("fecha", <Alert variant="danger">La fecha no puede ser anterior a hoy.</Alert>);
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: today.toISOString().split('T')[0], // Set today's date in YYYY-MM-DD format
                }));
                return;
            }
        }
    
        // Validation logic for time
        if (name === 'time') {
            const selectedDate = new Date(formData.date);
            const currentTime = new Date();
            const selectedTime = new Date(`${formData.date}T${value}:00`);
    
            // Reset current time to current date for comparison
            const currentDateTime = new Date();
            currentDateTime.setSeconds(0, 0);
    
            if (selectedDate.getTime() === today.getTime() && selectedTime < currentDateTime) {
                myPojo.setNotif("hora", <Alert variant="danger">La hora no puede ser anterior a la hora actual.</Alert>);
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: currentDateTime.toTimeString().slice(0, 5), // Set current time in HH:MM format
                }));
                return;
            }
        }
    
        setFormData((prevData) => ({
            ...prevData,
            [name]: updatedValue,
        }));
    };
    
    

    const handlePlaceSelect = (type, place, latLng, modeTransport) => {
        if (type === 'arrival') {
            setFormData(prevData => ({
                ...prevData,
                arrivalPlace: place,
            }));
            setArrivalLatLng(latLng);
        } else if (type === 'departure') {
            setFormData(prevData => ({
                ...prevData,
                departurePlace: place,
            }));
            setDepartureLatLng(latLng);
        }

        if (departureLatLng[0] !== null && arrivalLatLng[0] != null && modeTransport != null) {

            getDistanceTimeMatrix(departureLatLng, arrivalLatLng, modeTransport).then(response => {
                console.log("la respuesta del calculo es:", response);
                setResult(response);

            });
        }

        setTransport(modeTransport);
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
        event.preventDefault(); // Evitar envíos por defecto o nulos

        const { hours, minutes } = convertTimeString(formData.time);

        // Crear un objeto para iniciar la verificación
        const newEvent = {
            schedule_eventname: formData.name,
            schedule_duration_hour: hours,
            schedule_duration_min: minutes,
            schedule_datetime: formData.date, // Assuming this is where the datetime is coming from
            user_id: props.user_id,
        };

        // Verificar existencia de conflicto
        if (checkScheduleConflict(newEvent)) {
            // Obtener la información del evento con el que se tiene conflicto
            const conflictingEvent = findConflictEvent(newEvent);

            if (conflictingEvent) {
                const { schedule_eventname, schedule_datetime } = conflictingEvent;
                myPojo.setNotif("¡Cuidado!", `Se tiene conflicto con el evento ${schedule_eventname} en el día ${schedule_datetime}`);
            }
            return;
        }

        addSchedule(newEvent);
        addNewEvent(newEvent);




        const saveTone = formData.alarmTone ? addTone(formData) : Promise.resolve({ data: { tone_id: null } });

        saveTone.then(response => {
            const tone_id = response.tone_id;
            //Tratar de almacenar las ubicaciones asignadas

            const reminder = {
                reminder_name: formData.name,
                reminder_date: formData.date,
                reminder_hour: hours,
                reminder_min: minutes,
                reminder_active: formData.alarmActive,
                reminder_tone_duration_sec: formData.duration,
                reminder_advance_min: parseInt(formData.reminderAdvance, 10),
                reminder_img: formData.image,
                reminder_desc: formData.description,
                reminder_days_suspended: parseInt(formData.snooze, 10),
                reminder_share: 0,
                tone_id: tone_id,
                reminder_travel_time: result.duration.value,
                user_id: props.user_id
            };

            saveUserReminder(reminder).then(response => {
                const { reminder_id } = response.data;


                //Tratar de almacenar las ubicaciones asignadas

                //Verificar que, únicamente si ambos arreglos se llenan se trate de guardar: sino, nada            
                if (arrivalLatLng != [null, null]
                    && departureLatLng != [null, null]
                ) {
                    const arriveLocation = {
                        location_x: arrivalLatLng[0],
                        location_y: arrivalLatLng[1],
                        location_type: 0,
                        reminder_id: reminder_id,
                    }
                    const departureLocation = {
                        location_x: departureLatLng[0],
                        location_y: departureLatLng[1],
                        reminder_id: 1,
                        reminder_id: reminder_id,
                    }

                    addLocation(arriveLocation).then(response => {

                        addLocation(departureLocation)

                    })
                }
          
                // Tratar de guardar la localización

                if (formData.goalList.length > 0) {
                    formData.goalList.forEach(goal => {
                        const objectiveBlockData = {
                            objblo_name: goal.name,
                            objblo_duration_min: goal.time,
                            objblo_durationreal_min: 0,
                            objblo_check: false,
                            reminder_id: reminder_id,
                        };

                        saveObjectivesBlock(objectiveBlockData).then(response => {
                            const { objblo_id } = response.data;

                            goal.objectives.forEach(objective => {
                                const goalData = {
                                    obj_name: objective,

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
                if (formData.shareUsers.length > 0) {
                    formData.shareUsers.forEach(invUser => {
                        checkIfUserBlocked(props.user_i, invUser.id).then(res => {
                            // console.log(res.data.isBlocked);
                            if(!res.data.isBlocked){ //si no esta bloqueado, lo hace
                                const invitationUserData = {
                                    reminder_id: reminder_id,
                                    alarm_id: null,
                                    user_id_owner: props.user_id,
                                    user_id_target: invUser.id,
                                    inv_state: null,
                                    inv_reason: null,
                                };
                                addInvitation(invitationUserData).then(res => {
                                    if(res.status)
                                    console.log("Si se guarda bien la invitacion");
                                    console.log(res);
                                }).catch(error => {
                                    console.error("Error saving invitation ", error);
                                });
                            }
                        }
                        ).catch(err => { console.log(err) })

                    });
                }
            }).catch(error => {
                console.error("Error saving reminder share", error);
            });
        }).catch(error => {
            console.error("Error saving reminder", error);
        });
        props.showform();
    };

    const handleDeleteReminder = () => {
        deleteReminder(props.Reminder_id).then(res => {
            props.setReminderId(null);
            props.showform();
        }).catch(err => { console.log(err) });
    }
    const handleClose = () => {
        props.showform();
        props.setReminderId(null);
    }
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
                        {(props.Reminder_id != null) &&
                            <button className="reminders-close-button" onClick={() => handleDeleteReminder()}><IoTrashSharp size={24} /></button>
                        }
                        <h2 className="reminder-title">Configurar Recordatorio</h2>
                        <button className="reminders-close-button" onClick={() => { handleClose() }}>X</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <Container fluid className="reminder-view">
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
                                            required
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
                                <p>Tiempo de llegada: {result.duration.text}</p>
                                <p> Distancia de: {result.distance.text}</p>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    <div className="map-placeholder" style={{ height: '200px', backgroundColor: '#f0f0f0', margin: '1rem 0' }}>
                                        <MapView onPlaceSelect={handlePlaceSelect} active={active} />
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
                                            min={0}
                                            max={5}
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
                                            maxLength={200}
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
                            <div className="form-actions">
                                <Button type="button" className="btn btn-secondary" onClick={() => setShowShareUsers(showShareUsers => !showShareUsers)}>
                                    Compartir
                                </Button>

                                <Button type="submit" className="btn btn-primary">
                                    Guardar
                                </Button>
                            </div>
                        </Container>
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
                            // revisar user_id
                            user_id={props.user_id}
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
