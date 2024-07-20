import React, { useState, useEffect } from 'react';
import '../../../styles/advices/Preparation.css';

const PreparationView = ({ onClose, objectives, timeLimit }) => {
    const [counter, setCounter] = useState(timeLimit * 60); // Convert timeLimit from minutes to seconds
    const [objectiveList, setObjectiveList] = useState(objectives);
    const [showMiniTab, setShowMiniTab] = useState(false);

    useEffect(() => {
        if (counter > 0) {
            const timer = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [counter]);

    const handleConfirm = (id) => {
        setObjectiveList(objectiveList.map(item =>
            item.id === id ? { ...item, confirmed: true } : item
        ));
    };

    return (
        <>
            {showMiniTab ? (
                <div className="preparation-mini-tab" onClick={() => setShowMiniTab(false)}>
                    Reopen Preparation View
                </div>
            ) : (
                <div className="preparation-fullscreen-container">
                    <button className="preparation-close-button" onClick={() => {
                        setShowMiniTab(true);
                        onClose();
                    }}>Close</button>
                    <div className="preparation-counter">
                        {Math.floor(counter / 60)}:{String(counter % 60).padStart(2, '0')}
                    </div>
                    <div className="preparation-items-list">
                        {objectiveList.map(item => (
                            <div
                                key={item.id}
                                className={`preparation-item ${item.confirmed ? 'confirmed' : ''}`}
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        onChange={() => handleConfirm(item.id)}
                                        disabled={item.confirmed}
                                    />
                                    {item.text}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default PreparationView;
