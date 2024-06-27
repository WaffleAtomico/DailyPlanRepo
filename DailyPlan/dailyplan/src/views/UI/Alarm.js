import React, { useState } from 'react';
import Form_createAlarm from '../../components/alarm/options';
import ButtonAlarm from '../../components/alarm/create-btn';
import { FaPlus } from "react-icons/fa";

import '../../styles/UI/Alarm/alarmview.css'

function Alarm_view() {
    const [visible, setVisibilty] = useState(false);

    const handleForm = () => {
        console.log("activado");
        setVisibilty(visible => !visible);
    }

    const [items, setItems] = useState(['Item 1']); // Items iniciales

    const addItem = () => {
        const newItem = `Item ${items.length + 1}`;
        setItems([...items, newItem]);
    };

    // Función para dividir los items en líneas de 4
    const chunkArray = (arr, size) => {
        return Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
            arr.slice(index * size, index * size + size)
        );
    };

    // Dividir los items en líneas de 4
    const itemLines = chunkArray(items, 4);

    return (
        <div className='alarmv-body'>
           {visible && <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 999
            }} >
            
            <div style={{ visibility: visible ? 'visible' : 'hidden', paddingTop: "2rem" }}>
                 <Form_createAlarm 
                    setVisibilty={setVisibilty}
                /> 
            </div>
            </div>}
            <div className="item-grid">
            {/* Mostrar el botón de "Agregar" en la primera línea */}
            <div className="linea">
                <div className="item" >
                    <button className="custom-button agregar-btn" onClick={addItem} >
                        <FaPlus size={40}/>
                    </button>
                </div>
                {itemLines[0].map((item, itemIndex) => (
                <div className="item" key={itemIndex} onClick={()=>setVisibilty(visible => !visible)}>
                        {item}
                    </div>
                ))}
            </div>

            {/* Mostrar las líneas de items restantes */}
            {itemLines.slice(1).map((line, index) => (
                <div className="linea" key={index + 1}>
                    {line.map((item, itemIndex) => (
                        <div className="item" key={itemIndex}>
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>


        </div>
    );
}

export default Alarm_view;