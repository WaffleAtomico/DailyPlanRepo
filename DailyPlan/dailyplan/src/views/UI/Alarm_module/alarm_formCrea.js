// AlarmView.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaRegCalendarAlt, FaRegBell, FaRegImage } from 'react-icons/fa';

import { addAlarm } from "../../../utils/validations/alarm";
import { addDaySelected } from "../../../utils/validations/dayselected";
import '../../../styles/UI/Alarm/alarm_formCrea.css';
import { myPojo } from '../../../utils/ShowNotifInfo';
import ShareUsers from '../Calendar_module/ShareReminder';
import { checkIfUserBlocked } from '../../../utils/validations/blockedurs';
import { addInvitation } from '../../../utils/validations/invitation';
import { addTone } from '../../../utils/validations/tone';

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
    const [ShareUser, setShareUser] = useState([])
    const [showShareUsers, setShowShareUsers] = useState(false)
    const [days, setDays] = useState({
        daysel_mon: 0,
        daysel_tues: 0,
        daysel_wed: 0,
        daysel_thur: 0,
        daysel_fri: 0,
        daysel_sat: 0,
        daysel_sun: 0,
    });
    const [daysSelectId, setdaysSelectId] = useState(0);

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


    //Handle para convertir el sonido en  base64
    const handleAlarmSoundChange = (event) => {
        const file = event.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target.result.split(',')[1];
                setAlarmSound({
                    base64: base64String,
                    name: file.name,
                    type: file.type
                });
            };
            reader.readAsDataURL(file);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        days.daysel_mon = 0;
        days.daysel_tues = 0;
        days.daysel_wed = 0;
        days.daysel_thur = 0;
        days.daysel_fri = 0;
        days.daysel_sat = 0;
        days.daysel_sun = 0;
    
        repeatDays.forEach(day_select => {
            switch (day_select) {
                case 'L':
                    days.daysel_mon = 1;
                    break;
                case 'M':
                    days.daysel_tues = 1;
                    break;
                case 'Mi':
                    days.daysel_wed = 1;
                    break;
                case 'J':
                    days.daysel_thur = 1;
                    break;
                case 'V':
                    days.daysel_fri = 1;
                    break;
                case 'S':
                    days.daysel_sat = 1;
                    break;
                case 'D':
                    days.daysel_sun = 1;
                    break;
                default:
                    break;
            }
        });
    
        try {
            // console.log("hola");
            const response = await addDaySelected(days);
            const alarmTime_array = alarmTime.split(':');
    
            const alarmInfoToSend = {
                alarm_name: alarmName,
                daysel_id: response.data.insertId,
                alarm_hour: alarmTime_array[0],
                alarm_min: alarmTime_array[1],
                alarm_sec: alarmDuration,
                alarm_rep_tone: alarmRepetition,
                tone_id: null,
                alarm_days_suspended: suspensionDays,
                alarm_active: 1,
                alarm_image: alarmImage,
                alarm_desc: alarmDescription,
                user_id: props.user_id
            };
    
            // agregar sonido a la BD para posteriormente reproducir
            if (alarmSound) {
                try {
                    const toneResponse = await addTone({
                        alarmTone: alarmSound.base64,
                        alarmToneName: alarmSound.name,
                        alarmToneType: alarmSound.type
                    });
                    console.log("La respuesta despues de agregar el tono es:", toneResponse);
                    alarmInfoToSend.tone_id = toneResponse.tone_id; // Ensure correct access to tone_id
                } catch (error) {
                    console.log("Todo salio mal:", error);
                    return; // Exit if there's an error saving the tone
                }
            }
    
            // Mandar a guardar la alarma
            try {
                const res = await addAlarm(alarmInfoToSend);
                if (res) {
                    const { alarm_id } = res.data;
                    console.log(alarm_id);
                    
                    if (ShareUser.length > 0) {
                        for (const invUser of ShareUser) {
                            try {
                                const res = await checkIfUserBlocked(invUser.id, props.user_id);
                                console.log("Esta bloqueado? ", res.data.isBlocked);
                                if (!res.data.isBlocked) { // si no esta bloqueado, lo hace
                                    const invitationUserData = {
                                        reminder_id: null,
                                        alarm_id: alarm_id,
                                        user_id_owner: props.user_id,
                                        user_id_target: invUser.id,
                                        inv_state: null,
                                        inv_reason: null,
                                    };
                                    const inviteRes = await addInvitation(invitationUserData);
                                    if (inviteRes.status) {
                                        console.log("Si se guarda bien la invitacion");
                                    }
                                    console.log(inviteRes);
                                }
                            } catch (error) {
                                console.error("Error saving invitation ", error);
                            }
                        }
                    }
                    props.fetchAlarms();
                    props.setVisibilty();
                }
            } catch (error) {
                console.error(error);
                myPojo.setNotif("Error: No se pudo guardar la alarma", <div size={220} />);
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleAddUser = (user) => {
        setShareUser((prevData) => [
            ...prevData,
            user
        ]);
    };

    const handleRemoveUser = (name) => {
        setShareUser((prevData) =>
            prevData.filter(user => user.name !== name)
        );
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
                                            max={5}
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
                                            maxLength={200}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary"
                            onClick={() => setShowShareUsers(showShareUsers => !showShareUsers)}
                        >
                            Compartir
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
                <br></br>
                {showShareUsers &&
                    <ShareUsers
                        // revisar user_id
                        user_id={props.user_id}
                        onAddUser={handleAddUser}
                        onRemoveUser={handleRemoveUser}
                        userList={ShareUser}
                    />
                }
            </div>
        </div>
    );
};

export default AlarmFormView;