import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import Form_createAlarm from './options';
import Alarm_formCrea from './alarm_formCrea';

import '../../../styles/UI/Alarm/alarmview.css'
import '../../../styles/UI/Alarm/alarmview.css';

function Alarm_view() {
    const [visible, setVisibilty] = useState(false);
    const [items, setItems] = useState([]);
    
    const addItem = () => {
        setVisibilty(visible => !visible);

        //Si recibe el boton de guardar, debe de agregar un nuevo item con la informacion que se obtuvo del formulario
        // if()
        // {

        // }
        // const newItem = `Item ${items.length + 1}`;
        // setItems([...items, newItem]);
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
                        setVisibilty={setVisibilty} 
                    />
                    
                </div>
            </div>}
            {items.length > 0 && (
                <div className="crealar-item-grid">
                    <div className="crealar-linea">
                        <div className="crealar-item" onClick={addItem}>
                            <button className="crealar-custom-button crealar-agregar-btn" >
                                <FaPlus size={40} />
                            </button>
                        </div>
                        {firstLine.map((item, itemIndex) => (
                            <div className="crealar-item" key={itemIndex} onClick={() => setVisibilty(visible => !visible)}>
                                {item}
                            </div>
                        ))}
                    </div>
                    {remainingLines.map((line, index) => (
                        <div className="crealar-linea" key={index + 1}>
                            {line.map((item, itemIndex) => (
                                <div className="crealar-item" key={itemIndex}>
                                    {item}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
            {items.length === 0 && (
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
