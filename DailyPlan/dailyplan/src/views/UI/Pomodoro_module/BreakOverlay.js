import React, { useEffect, useState } from 'react';
// import '../../styles/UI/Pomodoro/breakoverlay.css';


//https://pomofocus.io/

const BreakOverlay = ({ timeRemaining }) => {
    const [cursorMoved, setCursorMoved] = useState(false);
    const [messages, setMessages] = useState([
        "¡Es tu tiempo de descanso! Haz otra actividad",
        "Recuerda relajarte y estirarte",
        "¿Qué tal una caminata corta?",
        "Despeja tu mente por un momento",
        "Tómate un momento para hidratarte"
    ]);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    
    useEffect(() => {
        let timeoutId;

        const handleMouseMove = () => {
            setCursorMoved(true);
            clearTimeout(timeoutId); // Limpiar el timeout anterior
            timeoutId = setTimeout(() => {
                // Cambiar el mensaje después de 5 segundos
                setCurrentMessageIndex((prevIndex) =>
                    prevIndex < messages.length - 1 ? prevIndex + 1 : 0
                );
            }, 5000);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearTimeout(timeoutId); // Limpiar el timeout al desmontar el componente
        };
    }, [messages]);
    

    return (
        <div className="break-overlay">
            <div className="break-time">
                {`${Math.floor(timeRemaining / 60)}:${('0' + timeRemaining % 60).slice(-2)}`}
            </div>
            {cursorMoved && <div className="break-warning">{messages[currentMessageIndex]}</div>}
        </div>
    );
};

export default BreakOverlay;
