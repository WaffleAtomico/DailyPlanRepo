import React, { useState } from 'react';
import '../../styles/UI/Alarm/Alarm.css'; // Importa tus estilos CSS aquí

function Alarm_view() {
    const [activo, setActivo] = useState(false);
    const [horaDormir, setHoraDormir] = useState('');
    const [horaDespertar, setHoraDespertar] = useState('');

    return (
        <div >
            {/* Alarmas */}
            <div>
                {/* Boton para agregar las Alarmas
            Se debe de mover cuando se agregen como maximo 3 en una fila */}
                <div className="alarma">
                    <div className="alarma-container">
                        <div className="toggle-container">
                            Activar
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={activo}
                                    onChange={() => setActivo(!activo)}
                                />
                                <span className="slider round"></span>
                            </label>
                            Desactivar
                        </div>
                        <div className="input-container">
                            <div className="time-input">
                                <input
                                    type="time"
                                    placeholder="Hora para dormir"
                                    value={horaDormir}
                                    onChange={(e) => setHoraDormir(e.target.value)}
                                />
                            </div>
                            <div className="time-input">
                                <input
                                    type="time"
                                    placeholder="Hora para despertar"
                                    value={horaDespertar}
                                    onChange={(e) => setHoraDespertar(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="confirmar-button-container">
                            <button className="confirm" onClick={() => console.log(horaDormir)}>
                                Confirmar hora de dormir
                            </button>
                        </div>
                    </div>
                </div>

                <div className="horas-container">
                    <label className='horas'> X </label>
                    <label className='texto'> Horas <br /> de <br /> Sueño </label>
                </div>

                <input
                    type="text"
                    placeholder="Inserta un Link de Youtube o de Spotify para reproducirlo mientras duermes"
                    value={horaDespertar}
                    onChange={(e) => setHoraDespertar(e.target.value)}
                />

            </div>
            {/* Agregar que cuando da click aparece el componente de las opciones  */}
            {/* Al hacer ese componente se debe de agregar de alguna manera el apartado del mapa */}
        </div >
    );
}

export default Alarm_view;