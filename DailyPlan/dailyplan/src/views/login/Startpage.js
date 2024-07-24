import React from "react";
import Header_startpage from "../UI/nav/LoginBar";
import Image from 'react-bootstrap/Image';
import { FaRegClock, FaCalendarCheck, FaClock, FaRegBell } from 'react-icons/fa';
import { IoStopwatchOutline } from "react-icons/io5";
import "../../styles/start/startpage.css";

export default function Startpage() {
    return (
        <>
            <Header_startpage />
            <div className="startpage-container">
                <section className="startpage-intro text-center p-5">
                    <h1 className="startpage-title display-4">Bienvenido a dailyPlan</h1>
                    <p className="startpage-description lead">
                        Organiza tu vida y maximiza tu tiempo con nuestras herramientas personalizadas.
                        <p className="startpage-description lead">
                            Mejora tu <b>Puntualidad</b>  con herramientas efectivas
                        </p>
                    </p>

                </section>

                <section className="startpage-features">
                    <div className="startpage-feature feature-large feature-1">
                        <div className="feature-content">
                            <p className="feature-italic">Prepárate con tiempo</p>
                            <div className="feature-text">
                                <h2 className="feature-title">Preparación</h2>
                                <p className="feature-description">Planifica tus actividades antes de salir con un simple clic.</p>
                                <FaRegClock className="feature-icon" />
                            </div>
                        </div>
                    </div>
                    {/* <Image src="holder.js/171x180" rounded /> */}
                    <div className="startpage-feature feature-small feature-2">
                        <div className="feature-content">
                            <p className="feature-italic">Administra tu trabajo</p>
                            <div className="feature-text">
                                <h2 className="feature-title">Ciclos Pomodoros</h2>
                                <p className="feature-description">Organiza tu trabajo en intervalos efectivos y productivos.</p>
                                <FaClock className="feature-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="startpage-feature feature-medium feature-3">
                        <div className="feature-content">
                            <p className="feature-italic">Organiza tu futuro</p>
                            <div className="feature-text">
                                <h2 className="feature-title">Calendario</h2>
                                <p className="feature-description">Genera recordatorios y nunca lllegues tarde a una cita importante.</p>
                                <FaCalendarCheck className="feature-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="startpage-feature feature-large feature-4">
                        <div className="feature-content">
                            <p className="feature-italic">Supera tus limites</p>
                            <div className="feature-text">
                                <h2 className="feature-title">Chronómetros</h2>
                                <p className="feature-description">Guarda marcas de tiempo y analiza las diferencias con precisión.</p>
                                <IoStopwatchOutline className="feature-icon" />
                            </div>
                        </div>
                    </div>
                    <div className="startpage-feature feature-small feature-5">
                        <div className="feature-content">
                            <p className="feature-italic">Conoce el tiempo de todos</p>
                            <div className="feature-text">
                                <h2 className="feature-title">Relojes</h2>
                                <p className="feature-description">Personaliza y guarda tus relojes con distintos sitios del mundo.</p>
                                <FaRegBell className="feature-icon" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
