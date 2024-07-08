import React, { useState } from 'react';
import { BsDatabaseFillExclamation } from "react-icons/bs";
import { IoCloseCircleOutline } from "react-icons/io5";
import '../../../styles/advices/BdNoConnection.css';
import { isDbConnected } from "../../../utils/validations/user"

function BdNoCon() {
    const [show, setShow] = useState(false);

    const checkDbConnection = async () => {
        isDbConnected()
            .then(response => {
                if (!response.data.connected) {
                    setShow(true);
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    setInterval(checkDbConnection, 10000);

    if (show) {
        return (
            <div className='BdNoCon-container'>
                <div className='BdNoCon-icon'>
                    <BsDatabaseFillExclamation />
                </div>
                <div className='BdNoCon-msj'>
                    No se ha podido conectar con el servidor, Actualiza la pagina, vuelve a intentarlo.
                </div>
                {show && (
                    <button className='BdNoCon-btn' onClick={() => setShow(false)}>
                        <IoCloseCircleOutline />
                    </button>
                )}
            </div>
        );
    } else {
        return (<p></p>);
    }
};


export { BdNoCon }