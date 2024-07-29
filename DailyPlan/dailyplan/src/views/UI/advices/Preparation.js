import React, { useState, useEffect } from 'react';
import '../../../styles/advices/Preparation.css';
import { completeObjectivesBlock } from '../../../utils/validations/objetiveblock';
import { IoClose, IoTime } from 'react-icons/io5';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';
import { FaListCheck } from 'react-icons/fa6';
import { MdOutlineTimelapse } from 'react-icons/md';
import { myPojo } from '../../../utils/ShowNotifInfo';

const PreparationView = ({ onClose, blocks, setShowMiniTab, handleUpdateBlocks, id_user }) => {
    const [currentBlock, setCurrentBlock] = useState(0);
    const [objectiveList, setObjectiveList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [advice, setAdvice] = useState('');
    const [allObjectives, setAllObjectives] = useState([]);
    const [totalTimeLeft, setTotalTimeLeft] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [blocksToUpd, setBlocksToUpd] = useState([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [timeSpent, setTimeSpent] = useState(0);
    const [showTravelMessage, setShowTravelMessage] = useState(false);
    const [initialPosition, setInitialPosition] = useState(null);
    const [isCompletedArchivement1, setIsCompletedArchivement1] = useState(true);
    const [isCompletedArchivement2, setIsCompletedArchivement2] = useState(true);

    //#region 
    useEffect(() => {
        confirmArchivement1(id_user);
        confirmArchivement2(id_user)
        console.log("uno ", isCompletedArchivement1);
        console.log("dos ", isCompletedArchivement2);
    }, []);

    const confirmArchivement1 = (user_id) => {
        const grant_title_id = 9;
        isCompleted(user_id, grant_title_id).then(response => {
            // console.log("IsCompleted", response);
            if (response == false) {
                // console.log("Si es falso?", response)
                setIsCompletedArchivement1(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    }
    const confirmArchivement2 = (user_id) => {
        const grant_title_id = 10;
        isCompleted(user_id, grant_title_id).then(response => {
            // console.log("IsCompleted", response);
            if (response == false) {
                // console.log("Si es falso?", response)
                setIsCompletedArchivement2(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    }

    const grant10Archivement = (user_id) => {
        const grant_title_id = 10;
        console.log("Is completed:? ", isCompletedArchivement1);
        if (!isCompletedArchivement1) { //si no esta completado hay que entregarlo
            grantArchivement(user_id, grant_title_id).then(res => {
                console.log(res);
                
                myPojo.setNotif("Logro: TODO EN SU LUGAR", <FaListCheck size={220} />);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        }
    };
    const grant11Archivement = (user_id) => {
        const grant_title_id = 11;
        console.log("Is completed:? ", isCompletedArchivement2);
        if (!isCompletedArchivement2) {
            grantArchivement(user_id, grant_title_id).then(res => {
                console.log(res);
                
                myPojo.setNotif("Logro: GANANDO TIEMPO AL TIEMPO", <MdOutlineTimelapse size={220} />);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        }
    };
    //#endregion

    const dummyData = [
        '¡Buen trabajo! ¡Has completado un bloque de objetivos!',
        'Excelente, sigue así y alcanzarás tus metas.',
        '¡Estás haciendo un gran esfuerzo! Mantén el ritmo.',
        '¡Fantástico! Cada objetivo completado te acerca más a tu meta.',
        '¡Impresionante! Ya casi llegas al final.',
    ];

    useEffect(() => {
        if (blocks && blocks.length > 0) {
            const newObjectives = blocks[0].objectives;
            const newCounter = blocks[0].timeLimit * 60; // convert to seconds
            const newTotalTimeLeft = blocks.reduce((acc, block) => acc + block.timeLimit * 60, 0); // convert to seconds
            const newAllObjectives = blocks.flatMap(block =>
                block.objectives.map(obj => ({ ...obj, confirmed: false }))
            );

            setObjectiveList(newObjectives);
            setCounter(newCounter);
            setTotalTimeLeft(newTotalTimeLeft);
            setAllObjectives(newAllObjectives);
            setStartTime(Date.now());

            // Get initial position
            navigator.geolocation.getCurrentPosition(position => {
                setInitialPosition({ lat: position.coords.latitude, lon: position.coords.longitude });
            });
        }
    }, [blocks]);

    useEffect(() => {
        if (counter > 0 && totalTimeLeft > 0) {
            const timer = setInterval(() => {
                setCounter(prevCounter => prevCounter - 1);
                setTotalTimeLeft(prevTotalTime => prevTotalTime - 1);
                setTimeSpent(Date.now() - startTime);
            }, 1000);
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
                completeBlock(updatedBlocks);
                setShowMiniTab(false);
                onClose();
            } else if (totalTimeLeft <= 0) {
                completeBlock(updatedBlocks);
                setShowTravelMessage(true);
                setTimeUp(true);
            } else if (currentBlock < blocks.length - 1) {
                const nextBlock = currentBlock + 1;
                const timeLeft = counter;
                const unconfirmedObjectives = objectiveList.filter(item => !item.confirmed);

                const timeSpentForBlock = blocks[currentBlock].timeLimit * 60 - timeLeft;
                updatedBlocks[currentBlock].timeSpent = timeSpentForBlock; // Store time spent in seconds

                setCurrentBlock(nextBlock);
                setObjectiveList([...unconfirmedObjectives, ...blocks[nextBlock].objectives]);
                setCounter(blocks[nextBlock].timeLimit * 60 + timeLeft);
                setAdvice(dummyData[Math.floor(Math.random() * dummyData.length)]);
                setBlocksToUpd(updatedBlocks);
                setStartTime(Date.now());
            }
        } else {
            if (blocks[currentBlock].travelTime > 1) {
                setShowTravelMessage(true);
                setTimeUp(true);
            }
        }
    };

    const completeBlock = (updatedBlocks) => {
        const timeLeft = counter;
        const timeSpentForBlock = blocks[currentBlock].timeLimit * 60 - timeLeft;
        updatedBlocks[currentBlock].timeSpent = timeSpentForBlock; // Store time spent in seconds

        const completeInfo = {
            objblo_check: 1,
            objblo_durationreal_min: timeSpentForBlock / 60 // Convert seconds to minutes
        };

        console.log("Complete Info:", completeInfo);
        console.log("Block ID:", updatedBlocks[currentBlock].id);

        completeObjectivesBlock(completeInfo, updatedBlocks[currentBlock].id);
        setBlocksToUpd(updatedBlocks);
    };

    const CalculateDistance = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const distance = getDistanceFromLatLonInMeters(initialPosition.lat, initialPosition.lon, latitude, longitude);
            if (distance > 100) {
                alert('You have traveled more than 100 meters.');
            } else {
                alert('You have not traveled more than 100 meters.');
            }
        });
    };

    const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // meters
        const phi1 = lat1 * (Math.PI / 180);
        const phi2 = lat2 * (Math.PI / 180);
        const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
        const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

        const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
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
                                className={`preparation-item ${item.confirmed ? 'confirmed removing' : ''}`}
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
                    {blocks[currentBlock].travelTime > 1 && (
                        <>
                            <p>Es hora de viajar. Tiempo estimado de viaje: {blocks[currentBlock].travelTime} minutos.</p>
                            <button onClick={CalculateDistance}>Check Distance</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default PreparationView;
