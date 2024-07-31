import React, { useState, useEffect } from 'react';
import '../../../styles/advices/Preparation.css';
import { completeObjectivesBlock } from '../../../utils/validations/objetiveblock';
import { IoClose, IoTime } from 'react-icons/io5';
import { grantArchivement, isCompleted } from '../../../utils/archivements/grantArchivement';
import { FaListCheck } from 'react-icons/fa6';
import { MdOutlineTimelapse } from 'react-icons/md';
import { timeFormatHHMMSS, timeFormatHHMMSSString } from '../../../utils/timeFormat';
import { myPojo } from '../../../utils/ShowNotifInfo';
import { getDistanceTimeMatrix } from '../../../utils/validations/services/distanceMatrixClient';
import { getLocationById } from '../../../utils/validations/location';
import PuntualitySummarize from '../Calendar_module/PuntualitySummarize';
import { updateObjectiveStatus } from '../../../utils/validations/objetive';


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
    const [chartData, setChartData] = useState({ labels: [], data: [] });
    const [isNear, setIsNear] = useState(false);
    //#region 
    useEffect(() => {
        confirmArchivement1(id_user);
        confirmArchivement2(id_user);
    }, []);

    const confirmArchivement1 = (user_id) => {
        const grant_title_id = 8;
        isCompleted(user_id, grant_title_id).then(response => {
            if (!response) {
                setIsCompletedArchivement1(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    };

    const confirmArchivement2 = (user_id) => {
        const grant_title_id = 10;
        isCompleted(user_id, grant_title_id).then(response => {
            if (!response) {
                setIsCompletedArchivement2(response);
            }
        }).catch(error => {
            console.error("Error confirming achievement: ", error);
        });
    };

    const grant10Archivement = (user_id) => {
        const grant_title_id = 10;
        if (!isCompletedArchivement2) {
            grantArchivement(user_id, grant_title_id).then(res => {
                myPojo.setNotif("Logro: TODO EN SU LUGAR", <FaListCheck size={220} />);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        }
    };

    /*
    const grant11Archivement = (user_id) => {
        const grant_title_id = 11;
        if (!isCompletedArchivement2) {
            grantArchivement(user_id, grant_title_id).then(res => {
                myPojo.setNotif("Logro: GANANDO TIEMPO AL TIEMPO", <MdOutlineTimelapse size={220} />);
            }).catch(error => {
                console.error("Error granting achievement:", error);
            });
        
        }
    };
*/
    const grant9Archivement = (user_id) => {
        const grant_title_id = 9;
        if (!isCompletedArchivement1) {
            grantArchivement(user_id, grant_title_id).then(res => {
                myPojo.setNotif("Logro: ENLISTADO", <FaListCheck size={220} />);
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
        console.log("Los bloques son:", blocks);
        if (blocks && blocks.length > 0) {
            let initialBlockIndex = blocks.findIndex(block =>
                block.objectives.some(obj => !obj.confirmed)
            );

            if (initialBlockIndex === -1) {
                // All objectives are completed
                console.log("Todos los objetivos están completados desde el inicio.");
                setObjectiveList([]);
                setCounter(0);
                setTotalTimeLeft(0);
                setAllObjectives([]);
                setStartTime(Date.now());
                setTimeUp(true);
                setShowTravelMessage(true);
                return;
            }

            let initialObjectives = blocks[initialBlockIndex].objectives.filter(obj => !obj.confirmed);
            let newCounter = blocks[initialBlockIndex].timeLimit * 60; // convert to seconds
            let newTotalTimeLeft = blocks.reduce((acc, block) => acc + block.timeLimit * 60, 0); // convert to seconds
            console.log("Tiempo restante (al inicio)", newTotalTimeLeft);
            let newAllObjectives = blocks.flatMap(block =>
                block.objectives.map(obj => ({ ...obj, confirmed: obj.confirmed, at_time: obj.at_time }))
            );

            setCurrentBlock(initialBlockIndex);
            setObjectiveList(initialObjectives);
            setCounter(newCounter);
            setTotalTimeLeft(newTotalTimeLeft);
            setAllObjectives(newAllObjectives);
            setStartTime(Date.now());
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
        const completedWithinTime = counter > 0;
        setObjectiveList(prevList =>
            prevList.map(item =>
                item.id === id ? { ...item, confirmed: true, removing: true, at_time: completedWithinTime } : item
            )
        );
        setTimeout(() => {
            setObjectiveList(prevList => prevList.filter(item => item.id !== id));
        }, 500);
        setAllObjectives(prevList =>
            prevList.map(item =>
                item.id === id ? { ...item, confirmed: true, at_time: completedWithinTime } : item
            )
        );

        // Call updateObjectiveStatus here
        updateObjectiveStatus(id, completedWithinTime)
            .then(response => {
                console.log('Objective status updated:', response);
            })
            .catch(error => {
                console.error('Error updating objective status:', error);
            });
    };

    const handleNextBlock = () => {
        const updatedBlocks = [...blocks];
        const currentBlockObjectivesCompleted = objectiveList.every(item => item.confirmed);
        const completedWithinTime = counter > 0;

        const updateObjectivesTime = () => {
            updatedBlocks[currentBlock].objectives = updatedBlocks[currentBlock].objectives.map(obj => {
                if (obj.confirmed && !obj.at_time) {
                    return { ...obj, at_time: completedWithinTime };
                }
                return obj;
            });
        };

        console.log("Tiempo restante:", totalTimeLeft);

        if (currentBlockObjectivesCompleted) {
            console.log("Objetivos del bloque actual completados.");
            updateObjectivesTime();
            completeBlock(updatedBlocks);

            if (currentBlock < blocks.length - 1) {
                const nextBlock = currentBlock + 1;

                let nextUnconfirmedBlockIndex = blocks.findIndex((block, index) =>
                    index > currentBlock && block.objectives.some(obj => !obj.confirmed)
                );

                if (nextUnconfirmedBlockIndex === -1) {
                    if (allObjectives.every(item => item.confirmed)) {
                        console.log("Todos los objetivos fueron completados en el tiempo.");
                        completeBlock(updatedBlocks);
                        setShowTravelMessage(true);
                        setTimeUp(true);
                    } else {
                        setShowMiniTab(false);
                        onClose();
                    }
                }

                setCurrentBlock(nextUnconfirmedBlockIndex);
                setObjectiveList(blocks[nextUnconfirmedBlockIndex].objectives.filter(obj => !obj.confirmed));
                setCounter(blocks[nextUnconfirmedBlockIndex].timeLimit * 60);
                setAdvice(dummyData[Math.floor(Math.random() * dummyData.length)]);
                setBlocksToUpd(updatedBlocks);
                setStartTime(Date.now());

                if (completedWithinTime) {
                    grant10Archivement(id_user);
                }
            } else {
                if (allObjectives.every(item => item.confirmed && item.at_time)) {
                    console.log("Todos los objetivos fueron completados en el tiempo.");
                    completeBlock(updatedBlocks);
                    setShowTravelMessage(true);
                    setTimeUp(true);
                } else {
                    setShowMiniTab(false);
                    onClose();
                }
            }
        } else if (totalTimeLeft <= 0) {
            console.log("Tiempo total agotado.");
            completeBlock(updatedBlocks);
            setShowTravelMessage(true);
            setTimeUp(true);
        }
    };



    const completeBlock = (updatedBlocks) => {
        grant9Archivement(id_user);
        const timeLeft = counter;
        const timeSpentForBlock = blocks[currentBlock].timeLimit * 60 - timeLeft;
        updatedBlocks[currentBlock].timeSpent = Math.abs(timeSpentForBlock); // Store time spent in seconds

        const completeInfo = {
            objblo_check: 1,
            objblo_durationreal_min: timeSpentForBlock / 60 // Convert seconds to minutes
        };

        completeObjectivesBlock(completeInfo, updatedBlocks[currentBlock].id);

        if (blocks && blocks.length > 0) {
            // Prepare data for the chart
            const labels = blocks.map((block, index) => `Block ${index + 1}`);
            const plannedTime = blocks.map(block => block.timeLimit * 60); // Planned time in seconds
            const obtainedTime = blocks.map(block => block.timeSpent || 0); // Obtained time in seconds

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: 'Planned Time (in seconds)',
                        data: plannedTime,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Obtained Time (in seconds)',
                        data: obtainedTime,
                        backgroundColor: 'rgba(255,99,132,0.4)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                    }
                ]
            });
        }

        setBlocksToUpd(updatedBlocks);
    };



    const CalculateDistance = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            // Define initial arrivalLatLng as null
            let arrivalLatLng = null;

            getLocationById(blocks[0].reminder_id)
                .then(response => {
                    if (response.length > 0) {
                        const location = response.find(loc => loc.location_type === 0);
                        if (location) {
                            arrivalLatLng = [location.location_x, location.location_y];
                        }
                    }

                    // Check if arrivalLatLng is still null after processing the response
                    if (!arrivalLatLng) {
                        console.error('Arrival location not found.');
                        alert('Arrival location not found.');
                        return;
                    }

                    const actualLatLng = [latitude, longitude];
                    const distance = getDistanceTimeMatrix(
                        arrivalLatLng,
                        actualLatLng
                    );

                    if (distance > 100) {
                        alert('Todavía estás a más de 100 metros de distancia');
                    } else {
                        alert('¡Felicidades!, estas a menos de 100 metros de distancia');

                        myPojo.setNotif("Resultado", <PuntualitySummarize chartData={chartData} />);


                    }
                })
                .catch(error => {
                    console.error('Error fetching location:', error);
                    alert('Un error ocurrió al obtener la ubicación:', error.message);
                });
        });
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
                        {objectiveList.length === 0 ? (
                            <p>No objectives found.</p>
                        ) : (
                            objectiveList.map(item => (
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
                            ))
                        )}
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
                            <p>Es hora de viajar. Tiempo estimado de viaje: {timeFormatHHMMSSString(blocks[currentBlock].travelTime)} minutos.</p>
                            <button onClick={CalculateDistance}>¿Ya ha llegado?</button>
                        </>
                    )}
                </div>
            )}

        </div>
    );

};

export default PreparationView;
