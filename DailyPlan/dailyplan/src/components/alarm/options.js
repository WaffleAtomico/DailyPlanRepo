import '../../styles/UI/Alarm/Form_creatAlarm.css';
import React from "react";
import Card from 'react-bootstrap/Card';
import CloseButton from 'react-bootstrap/CloseButton';

export default function Form_createAlarm(props) {
    
    return (
        <div className='form-body'>
            <Card className="text-center mx-auto" style={{ width: '43rem', marginTop: '90px', marginBottom: '110px' }} onClick={() => props.setVisibilty()} >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }} >
                    <CloseButton className='close-button'  />
                </div>
                <Card.Body>
                    <section className="form-input">
                        <form>
                            <p> Timbre </p>
                            <input className="text" type="text" />
                            <input className="browse" type="submit" name="create" value="Browse..." />
                            <p>
                                <input
                                    className="recordatorio"
                                    type="text"
                                    placeholder="Antelacion de Recordatorio"
                                    style={{ marginTop: '5px' }}
                                />
                            </p>
                            <p>
                                <input
                                    className="salida"
                                    type="text"
                                    placeholder="Contrase&ntilde;a"
                                />
                            </p>
                            <p>
                                <input
                                    className="llegada"
                                    type="text"
                                    placeholder="Contrase&ntilde;a"
                                />
                            </p>
                        </form>
                    </section>

                    <div className='cuadrote'>
                        <div className='cuadro'>
                            <input className="objetivo" type="text" placeholder='Nombre del Objetivo' />
                            <input className="tiempo" type="text" placeholder='Tiempo' />
                            <div className="scroller">
                                {/* {items.map((item, index) => (
                                    <div key={index}>
                                        <input type="checkbox" />
                                        <span>Texto del elemento {item}</span>
                                    </div>
                                ))} */}
                                <p className='elementoLista'>
                                    <input type="checkbox" className='checkElemento' />
                                    <span>Elemento</span>
                                </p>
                            </div>
                        </div>
                    </div>

                </Card.Body>
                <input className="guardar" type="submit" name="create" value="Guardar Alarma" />
            </Card>
        </div>
    );
}