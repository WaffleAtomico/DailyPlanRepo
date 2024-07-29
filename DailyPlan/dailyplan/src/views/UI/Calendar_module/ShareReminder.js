import React, { useState } from 'react';
import '../../../styles/UI/Calendar/ShareReminder.css';
import { getUsrByEmail } from '../../../utils/validations/user';

const ShareUsers = ({ user_id, onAddUser, onRemoveUser, userList }) => {
    const [userName, setUserName] = useState('');
    const handleAddUser = () => {
        getUsrByEmail(userName).then(emailExist => {
            const userData = emailExist.data[0];
            if (userData && user_id != userData.user_id) {
                // Verificar si el usuario ya está en la lista
                const userExists = userList.some(user => user.id === userData.user_id);
                if (!userExists) {
                    onAddUser({ id: userData.user_id, name: userData.user_mail });
                    setUserName('');
                } else {
                    alert("Este usuario ya está agregado.");
                }
            } else {
                alert("Correo inaccesible, intente otro");
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
