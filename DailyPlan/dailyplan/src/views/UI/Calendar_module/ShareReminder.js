import React, { useState } from 'react';
import '../../../styles/UI/Calendar/ShareReminder.css';
import { EmailExist } from '../../../utils/validations/user';

const ShareUsers = ({ onAddUser, onRemoveUser, userList }) => {
    const [userName, setUserName] = useState('');

    const handleAddUser = () => {
        /*
        
        A debate: Tecnicamente, se puede obtener un registro sabiendo solo el correo
        La query es mas cabrona, pero es un
        (Select user_id from user where user_mail = ?)
        Y ese es el valor que hariamos que agregara para el id del usuario al que se deba de agregar
        Pero, desde aqui se puede obtener el id una vez que se confirma que existe, entonces... 
        O se hace una query un poco mas complicada, o se deja como esta

        solo que nos ahorramos una funcion de la otra manera, ya que seria una nueva para sacar el
        user_id al que se invita, de la otra, ya estamos en el back y tenemos la informacion necesaria
        */
       
        EmailExist(userName).then(emailExist => {
            if (emailExist.data.exists) {
                onAddUser({ name: userName });
                setUserName('');
            }else{
                alert("Correo inexistente, intente otro");
            }
        }).catch(error => {
            console.error(error);
          });
    };

    return (
        <div className="ShareUsers-container">
            <div className="ShareUsers-input-container">
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Correo de usuario"
                    className="ShareUsers-input"
                />
                <button onClick={handleAddUser} className="ShareUsers-add-button">
                    Agregar
                </button>
            </div>
            <div className="ShareUsers-list-container">
                <ul className="ShareUsers-list">
                    {userList.map((user, index) => (
                        <li key={index} className="ShareUsers-list-item">
                            {user.name}
                            <button onClick={() => onRemoveUser(user.name)} className="ShareUsers-remove-button">
                                Quitar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ShareUsers;
