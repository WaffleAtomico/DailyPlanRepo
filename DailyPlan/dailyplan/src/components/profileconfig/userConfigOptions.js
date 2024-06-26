import React, { useState, useEffect } from 'react';
import { getAllArchivements } from '../../utils/archivements/grantArchivement';
import { CiCircleCheck } from "react-icons/ci";
import '../../styles/UI/profile/proftitles.css'


const PersoInfo = (props) => {
    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <h2>Información personal</h2>
        </div>
    );
}


const BloqUser = (props) => {

    

    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <h2>Usuarios bloqueados</h2>

        </div>
    );
}

const UserNodif = (props) => {
    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <h2>Notificaciones</h2>
        </div>
    );
}

const UserPermissions = () => {
    const [locationPermission, setLocationPermission] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [error, setError] = useState(null);

    const handlePermissionToggle = () => {
        if (!locationPermission) {
            requestLocationPermission();
        } else {
            setLocationPermission(false);
            setUserLocation(null);
        }
    };

    const requestLocationPermission = () => {
        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
            if (permissionStatus.state === 'granted') {
                fetchUserLocation();
            } else if (permissionStatus.state === 'prompt') {
                permissionStatus.onchange = () => {
                    fetchUserLocation();
                };
            }
        }).catch(error => {
            console.error('Error al solicitar permisos de ubicación:', error);
            setError('Error al solicitar permisos de ubicación.');
        });
    };

    const fetchUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                setLocationPermission(true);
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setError(null);
            },
            error => {
                console.error('Error al obtener la ubicación:', error);
                setError('No se pudo obtener la ubicación.');
            }
        );
    };

    return (
        <div style={{ backgroundColor: "#f0f0f0", padding: '20px', borderRadius: '5px', margin: '20px' }}>
            <h2>Permisos</h2>
            <label>
                Compartir Ubicación:
                <input
                    type="checkbox"
                    checked={locationPermission}
                    onChange={handlePermissionToggle}
                />
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {userLocation && (
                <p>Ubicación actual: Latitud {userLocation.latitude}, Longitud {userLocation.longitude}</p>
            )}
        </div>
    );
};


const UserTitles = (props) => {
    const [titles, setTitles] = useState([]);

    useEffect(() => {
        getUserArchivement(props.id);
    }, [props.id]);

    const getUserArchivement = async (user_id) => {
        try {
            const titlesData = await getAllArchivements(user_id);
            console.log(titlesData);
            console.log(titlesData);
            const filteredTitles = titlesData.filter(title => title.title_done === 1);
            // console.log(filteredTitles);
            setTitles(filteredTitles);
        } catch (error) {
            console.error("Error fetching titles:", error);
        }
    };

    return (
        <div style={{ backgroundColor: "#f0f0f0" }}>
            <h2>Títulos</h2>
            {titles.length > 0 ? (
                <table className="titl-custom-table">
                    <thead>
                        <tr>
                            <th className="titl-table-header">Título</th>
                            <th className="titl-table-header">Seleccionar título</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titles.map((title) => (
                            <tr key={title.title_id}>
                                <td className="titl-table-cell">{title.title_name}</td>
                                <td className="titl-table-cell">
                                    <div className="titl-circle-check">
                                        <CiCircleCheck />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>) : (
                <p>No tienes ningún título.</p>
            )}
        </div>
    );
};




export { BloqUser, PersoInfo, UserNodif, UserPermissions, UserTitles };