import React, { useEffect, useState } from 'react';
// import '../../styles/UI/Pomodoro/breakoverlay.css';


//https://pomofocus.io/
const BreakOverlay = ({ timeRemaining }) => {
    const [cursorMoved, setCursorMoved] = useState(false);

    useEffect(() => {
        const handleMouseMove = () => {
            setCursorMoved(true);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="break-overlay">
            <div className="break-time">
                {`${Math.floor(timeRemaining / 60)}:${('0' + timeRemaining % 60).slice(-2)}`}
            </div>
            {cursorMoved && <div className="break-warning">¡Es tu tiempo de descanso! Haz otra actividad</div>}
        </div>
    );
};

export default BreakOverlay;
