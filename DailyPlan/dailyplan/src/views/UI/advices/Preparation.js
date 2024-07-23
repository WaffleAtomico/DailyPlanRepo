import React, { useState, useEffect } from 'react';
import '../../../styles/advices/Preparation.css';
import { IoClose, IoTime } from 'react-icons/io5';

const PreparationView = ({ onClose, blocks, setShowMiniTab, handleUpdateBlocks }) => {
    const [currentBlock, setCurrentBlock] = useState(0);
    const [objectiveList, setObjectiveList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [advice, setAdvice] = useState('');
    const [allObjectives, setAllObjectives] = useState([]);
    const [totalTimeLeft, setTotalTimeLeft] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [blocksToUpd, setBlocksToUpd] = useState([]);

    const dummyData = [
        '¡Buen trabajo! ¡Has completado un bloque de objetivos!',
        'Excelente, sigue así y alcanzarás tus metas.',
        '¡Estás haciendo un gran esfuerzo! Mantén el ritmo.',
        '¡Fantástico! Cada objetivo completado te acerca más a tu meta.',
        '¡Impresionante! Ya casi llegas al final.',
    ];

    /**
     * Sigue habiendo problemas a la hora de que los objetivos se acaban, ya que
     * No los guarda como si estuviesen acabados, el funcionamiento principal
     * Ademas que ya sabe relativamente la diferencia con el tiempo
     * Al menos cuando se tarda menos, falta que podamos saber cuando se tarda mas en 
     * Otro bloque, mas tiempo del que vaya, le toca
     */
    /*
    El contador del tiempo debe de estar en origin page
    Ademas, debe de verificar con la hora a la que se deberia haber terminado la preparacion
    Si el usuario entra luego de la fecha a la que deberia estar,
    el tiempo se le va a tener que acortar

    Quiza desde reminders, deberia haber una opcion al editarlo que al
    actualizarlo, permita cambiar el valor de los valores de la lista de objetivos
    para poder hacer de mejor manera actualizacion de info
    */

    useEffect(() => {
        if (blocks && blocks.length > 0) {
            const newObjectives = blocks[0].objectives;
            const newCounter = blocks[0].timeLimit;
            const newTotalTimeLeft = blocks.reduce((acc, block) => acc + block.timeLimit, 0);
            const newAllObjectives = blocks.flatMap(block =>
                block.objectives.map(obj => ({ ...obj, confirmed: false }))
            );
            setObjectiveList(newObjectives);
            setCounter(newCounter);
            setTotalTimeLeft(newTotalTimeLeft);
            setAllObjectives(newAllObjectives);
        }
    }, [blocks]);

    useEffect(() => {
        if (counter > 0 && totalTimeLeft > 0) {
            const timer = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
                setTotalTimeLeft(prevTotalTime => prevTotalTime - 1);
            }, 1000);
            console.log(blocksToUpd);
            return () => clearInterval(timer);
        } else {
            handleNextBlock();
        }
    }, [counter, totalTimeLeft]);

    useEffect(() => {
        const unconfirmed = objectiveList.filter(item => !item.confirmed);
        if (unconfirmed.length === 0) {
            handleNextBlock();
        }
    }, [objectiveList]);

    const handleConfirm = (id) => {
        setObjectiveList(prevList =>
            prevList.map(item =>
                item.id === id ? { ...item, confirmed: true, removing: true } : item
            )
        );
        setTimeout(() => {
            setObjectiveList(prevList => prevList.filter(item => item.id !== id));
        }, 500);
        setAllObjectives(prevList =>
            prevList.map(item =>
                item.id === id ? { ...item, confirmed: true } : item
            )
        );
    };

    const handleNextBlock = () => {
        if (allObjectives.length > 0) {
            const allObjectivesCompleted = allObjectives.every(item => item.confirmed);
            const updatedBlocks = [...blocks];

            if (allObjectivesCompleted) {
                const timeLeft = counter;
                const timeSpent = blocks[currentBlock].timeLimit - timeLeft;
                updatedBlocks[currentBlock].timeDifference = timeSpent;
                setBlocksToUpd(updatedBlocks);
                setShowMiniTab(false);
                onClose();
            } else if (totalTimeLeft <= 0) {
                const timeLeft = counter;
                const timeSpent = blocks[currentBlock].timeLimit - timeLeft;
                updatedBlocks[currentBlock].timeDifference = timeSpent;
                setBlocksToUpd(updatedBlocks);
                setTimeUp(true);
                setTimeout(() => {
                    setShowMiniTab(false);
                    onClose();
                }, 5000);
            } else if (currentBlock < blocks.length - 1) {
                const nextBlock = currentBlock + 1;
                const timeLeft = counter;
                const unconfirmedObjectives = objectiveList.filter(item => !item.confirmed);

                const timeSpent = blocks[currentBlock].timeLimit - timeLeft;
                updatedBlocks[currentBlock].timeDifference = timeSpent;

                setCurrentBlock(nextBlock);
                setObjectiveList([...unconfirmedObjectives, ...blocks[nextBlock].objectives]);
                setCounter(blocks[nextBlock].timeLimit + timeLeft);
                setAdvice(dummyData[Math.floor(Math.random() * dummyData.length)]);
                // setAdvice(dummyData[Math.floor(Math.random() * dummyData.length)]);
                setBlocksToUpd(updatedBlocks);
            }
        }
    };

    return (
        <div className="preparation-fullscreen-container">
        <button className="preparation-close-button" onClick={() => {
            setShowMiniTab(true);
            onClose();
        }}>
            <IoClose size={40} />
        </button>
        {!timeUp && (
            <>
                <div className="preparation-block-name">
                    {blocks[currentBlock]?.name || 'Cargando...'}
                </div>
                <div className="preparation-counter">
                    {`${Math.floor(counter / 60).toString().padStart(2, '0')}:${(counter % 60).toString().padStart(2, '0')}`}
                </div>
                <div className="preparation-items-list">
                    {objectiveList.map(item => (
                        <div
                            key={item.id}
                            className={`preparation-item ${item.confirmed ? 'confirmed' : ''} ${item.removing ? 'removing' : ''}`}
                        >
                            <label className="preparation-item-label">
                                <input
                                    type="checkbox"
                                    onChange={() => handleConfirm(item.id)}
                                    disabled={item.confirmed}
                                />
                                <span className="checkmark"></span>
                                {item.text}
                            </label>
                        </div>
                    ))}
                </div>
                <div className="preparation-advice">
                    {advice}
                </div>
            </>
        )}
        {timeUp && (
            <div className="time-up-message" style={{ fontSize: '3rem', padding: '40px' }}>
                <IoTime size={100} />
                <span><h1>¡Se acabó el tiempo de preparación!</h1></span>
            </div>
        )}
    </div>

    );
};

export default PreparationView;
