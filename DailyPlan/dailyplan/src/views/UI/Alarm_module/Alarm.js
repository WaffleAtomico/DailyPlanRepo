import { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';


import Alarm_formCrea from './alarm_formCrea';

import { getAlarmsForUser } from "../../../utils/validations/alarm";
import { getDaySelectedById } from "../../../utils/validations/dayselected";

import '../../../styles/UI/Alarm/alarmview.css';

function Alarm_view(props) {
    const [visible, setVisibilty] = useState(false);
    const [items, setItems] = useState([]);
    const [tempItem, setTempItem] = useState([]);
    const [isFetched, setIsFetched] = useState(true);

    useEffect(() => {
        if(isFetched){
            console.log("entre");
            addItemsAlarms();
            setIsFetched(false)
        }

    }, [props]);

    const addItemsAlarms = () => {
        getAlarmsForUser(props.user_id).then(response => {
            const newTempItem = [...tempItem];
    
            const promises = response.data.map(alarm => {
                const newitems = newTempItem.filter(x => x.id === alarm.alarm_id);
    
                if (newitems.length === 0) {
                    return getDaySelectedById(alarm.daysel_id).then(res => {
                        let daysData;
    
                        if (res.data.length > 0) {
                            daysData = res.data[0];
                        } else {
                            daysData = {
                                daysel_mon: 0,
                                daysel_tues: 0,
                                daysel_wed: 0,
                                daysel_thur: 0,
                                daysel_fri: 0,
                                daysel_sat: 0,
                                daysel_sun: 0
                            };
                        }
    
                        return {
                            id: alarm.alarm_id,
                            name: alarm.alarm_name,
                            hour: `${alarm.alarm_hour}:${alarm.alarm_min}`,
                            days: daysData
                        };
                    });
                }
                return null;
            });
    
            Promise.all(promises).then(newItems => {
                const filteredItems = newItems.filter(item => item !== null);
                const combinedItems = [...newTempItem, ...filteredItems];
    
                const uniqueItems = combinedItems.reduce((acc, current) => {
                    const x = acc.find(item => item.id === current.id);
                    if (!x) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);
    
                setTempItem(uniqueItems);
                setItems(uniqueItems);
            }).catch(error => {
                console.error(error);
            });
        }).catch(error => {
            console.error(error);
        });
    };
    
    useEffect(() => {
        const uniqueItems = items.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);    
        if (JSON.stringify(items) !== JSON.stringify(uniqueItems)) {
            setItems(uniqueItems);
        }
    }, [items]);
    
    
    // useEffect(() => {
    //     let totalElementos = 0;

    //     items.forEach(item => {
    //         totalElementos += 1; 
    //     });

    //     console.log("ElementosEspecif0 ", items[0]);
    //     console.log("ElementosEspecif1 ", items[1]);
    //     console.log("ElementosEspecif2 ", items[2]);
    //     console.log("Elementos ", items);
    //     console.log("ElementosCant ", totalElementos);
    // }, [items]);


    const addItem = () => {
        setVisibilty(visible => !visible);
    };

    const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
            arr.slice(index * size, index * size + size)
        );
    };

    const firstLine = items.slice(0, 3); // First line has a max of 3 items
    const remainingItems = items.slice(3); // Rest of the items
    const remainingLines = chunkArray(remainingItems, 4); // Subsequent lines have max 4 items

    return (
        <div className='crealar-alarmv-body'>
            {visible && <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 999
            }} >
                <div style={{ visibility: visible ? 'visible' : 'hidden', paddingTop: "2rem" }}>
                    {/* <Form_createAlarm 
                        setVisibilty={setVisibilty} 
                        // saveAlarm={}
                    /> */}
                    <Alarm_formCrea
                        fetchAlarms={addItemsAlarms}
                        setVisibilty={setVisibilty}
                        user_id={props.user_id}
                    />

                </div>
            </div>}
            {(items.length > 0) && (
                <div className="crealar-item-grid">
                    <div className="crealar-linea">
                        <div className="crealar-item" onClick={addItem}>
                            <button className="crealar-custom-button crealar-agregar-btn" >
                                <FaPlus size={140} />
                            </button>
                        </div>
                        {firstLine.map((item, itemIndex) => (
                            <div className="crealar-item" key={itemIndex}>
                                <h3>{item.name}</h3>
                                <br />
                                <h1>{item.hour}</h1>
                                <br />
                                <div className={item.days.daysel_mon === 1 ? "day-selected" : "day-not-selected"}>
                                    <h4>L</h4>
                                </div>
                                <div className={item.days.daysel_tues === 1 ? "day-selected" : "day-not-selected"}>
                                    <h4>M</h4>
                                </div>
                                <div className={item.days.daysel_wed === 1 ? "day-selected" : "day-not-selected"}>
                                    <h4>Mi</h4>
                                </div>
                                <div className={item.days.daysel_thur === 1 ? "day-selected" : "day-not-selected"}>
                                    <h4>J</h4>
                                </div>
                                <div className={item.days.daysel_fri === 1 ? "day-selected" : "day-not-selected"}>
                                    <h4>V</h4>
                                </div>
                                <div className={item.days.daysel_sat === 1 ? "day-selected" : "day-not-selected"}>
                                    <h4>S</h4>
                                </div>
                                <div className={item.days.daysel_sun === 1 ? "day-selected" : "day-not-selected"}>
                                    <h4>D</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                    {remainingLines.map((line, index) => (
                        <div className="crealar-linea" key={index + 1}>
                            {line.map((item, itemIndex) => (
                                <div className="crealar-item" key={itemIndex}>
                                    <h3>{item.name}</h3>
                                    <br />
                                    <h1>{item.hour}</h1>
                                    <br />
                                    <div className={item.days.daysel_mon === 1 ? "day-selected" : "day-not-selected"}>
                                        <h4>L</h4>
                                    </div>
                                    <div className={item.days.daysel_tues === 1 ? "day-selected" : "day-not-selected"}>
                                        <h4>M</h4>
                                    </div>
                                    <div className={item.days.daysel_wed === 1 ? "day-selected" : "day-not-selected"}>
                                        <h4>Mi</h4>
                                    </div>
                                    <div className={item.days.daysel_thur === 1 ? "day-selected" : "day-not-selected"}>
                                        <h4>J</h4>
                                    </div>
                                    <div className={item.days.daysel_fri === 1 ? "day-selected" : "day-not-selected"}>
                                        <h4>V</h4>
                                    </div>
                                    <div className={item.days.daysel_sat === 1 ? "day-selected" : "day-not-selected"}>
                                        <h4>S</h4>
                                    </div>
                                    <div className={item.days.daysel_sun === 1 ? "day-selected" : "day-not-selected"}>
                                        <h4>D</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            {(items.length === 0) && (
                <div className="crealar-linea">
                    <div className="crealar-item" onClick={addItem}>
                        <button className="crealar-custom-button crealar-agregar-btn" >
                            <FaPlus size={40} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Alarm_view;
