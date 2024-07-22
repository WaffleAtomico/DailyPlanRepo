import React, { useState, useEffect } from "react";
import { getAllArchivements } from "../../../utils/archivements/grantArchivement";
import { CiCircleCheck } from "react-icons/ci";
import RealTimeLocationComponent from "../../../utils/components/location/RealTimeLocation";
import { getUsersBlocked } from "../../../utils/validations/blockedurs";
import { RiUserForbidLine } from "react-icons/ri";
import { FaCheckCircle, FaRegCircle, FaSpotify } from 'react-icons/fa';

import "../../../styles/UI/profile/configOptions.css";
import "../../../styles/UI/profile/notifView.css";
import "../../../styles/UI/profile/profileInfo.css";



const PersoInfo = () => {
  const [userName, setUserName] = useState('Nombre Usuario');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteAccount = () => {
    console.log('Cuenta eliminada');
  };

  return (
    <div className="info-container">
      <h2 className="info-title">Información personal</h2>
      <div className="info-field">
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="info-input"
        />
      </div>
      <div className="info-field">
        <label>Título:</label>
        <p className="info-value">Mi Título</p>
      </div>
      <div className="info-field">
        <label>Correo Registrado:</label>
        <p className="info-value">usuario@correo.com</p>
      </div>
      <div className="info-field">
        <label>Número Telefónico:</label>
        <p className="info-value">123-456-7890</p>
      </div>
      <button
        className="info-delete-button"
        onClick={() => setShowConfirmation(true)}
      >
        Eliminar Cuenta
      </button>
      {showConfirmation && (
        <div className="confirmation-overlay">
          <div className="confirmation-box">
            <p>¿Estás seguro de que deseas eliminar tu cuenta?</p>
            <button
              className="confirmation-button confirm"
              onClick={handleDeleteAccount}
            >
              Aceptar
            </button>
            <button
              className="confirmation-button cancel"
              onClick={() => setShowConfirmation(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BloqUser = (props) => {
  //Falta poder desbloquear usuarios dando a un boton, ya los obtenemos, ahora falta hacer un onclick que los quite
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    getBlockedUsers(props.id);
  }, [props.id]);

  const getBlockedUsers = (user_id) => {
    getUsersBlocked(user_id).then(blockedUsersData => {
      setBlockedUsers(blockedUsersData);
    }).catch(err => { console.log(err) });
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <h2>Usuarios bloqueados {blockedUsers.length} </h2>
      {blockedUsers.length > 0 ? (
        <table className="titl-custom-table">
          <thead>
            <tr>
              <th className="titl-table-header">Usuario</th>
              <th className="titl-table-header">Seleccionar</th>
            </tr>
          </thead>
          <tbody>
            {blockedUsers.map((blockedUsr) => (
              <tr key={blockedUsr.user_id_target}>
                <td className="titl-table-cell">{blockedUsr.user_mail}</td>
                <td className="titl-table-cell">
                  <div className="titl-circle-check"><RiUserForbidLine /></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes bloqueado a ningún usuario.</p>
      )}
    </div>
  );
};

const UserNotif = (props) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simular una solicitud de datos
    const fetchNotifications = () => {
      // Aquí puedes simular una solicitud de datos
      setTimeout(() => {
        const dummyData = [
          { id: 1, date: '2024-07-10', name: 'Invitación a Evento' },
          { id: 2, date: '2024-07-11', name: 'Nuevo Título Obtenido' },
          { id: 3, date: '2024-07-12', name: 'Reinicio Semanal Completado' },
        ];
        setNotifications(dummyData);
      }, 1000); // Simulación de demora de solicitud
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notif-container">
      <h2 className="notif-title">Notificaciones</h2>
      {notifications.length > 0 ? (
        <div className="notif-table-container">
          <table className="notif-table">
            <thead>
              <tr>
                <th className="notif-date-header">Fecha</th>
                <th className="notif-name-header">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td className="notif-date-cell">{notification.date}</td>
                  <td className="notif-name-cell">{notification.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="notif-empty-message">
          No tienes notificaciones en este momento. Puedes obtener notificaciones por medio de logros, invitaciones o esperar por un reinicio semanal.
        </p>
      )}
    </div>
  );
};

const UserConnections = (props) => {
  const [spotifyConnected, setSpotifyConnected] = useState(false);
  //cambiar a como sea necesario para llamar a la funcion de conexion
  return (
    <div className="user-connections">
      <h2>Conexiones</h2>
      {!spotifyConnected ? (
        <button
          className="spotify-button"
          onClick={() => setSpotifyConnected(true)}
        >
          <FaSpotify className="spotify-icon" />
          Conectar con Spotify
        </button>
      ) : (
        <button
          className="spotify-button"
          onClick={() => setSpotifyConnected(false)}
        >
          <FaSpotify className="spotify-icon" />
          Desconectar de Spotify
        </button>
      )}
    </div>
  );
};

const UserPermissions = (props) => {
  //Preguntar solo 1 vez, si permite acceder a la ubicacion, de hecho
  //IDEA: Solo cuando funcione la API de google maps, va a preguntar, si en este campo
  //lo marco como denegado, significa que no esta permitido, por medio del sistema
  /*
    Explico a detalle, no es solo el permiso del navegador, es saber si permite
    el usuario usar esa informacion, aunque ya se haya propiciado por el usuario
  */
  return (
    <div>
      <h1>Ubicación en tiempo real</h1>
      {/* cambiar en un tiempo */}
      {/* <RealTimeLocationComponent /> */}

    </div>
  );
  /*const [locationPermission, setLocationPermission] = useState(false);
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
    );*/
};

const UserTitles = (props) => {
  const [titles, setTitles] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {

    getUserArchivement(props.id);
  }, [props.id]);

  const getUserArchivement = async (user_id) => {
    try {
      const res = await getAllArchivements(user_id);
      const titlesData = res.data;
      console.log("Títulos recibidos: ", titlesData);
      if (Array.isArray(titlesData)) {
        const validTitles = [];
        titlesData.forEach(title => {
          if (title.title_done === 1) {
            validTitles.push(title);
          }
        });
        console.log("Títulos válidos: ", validTitles);
        setTitles(validTitles);
      } else {
        throw new Error("El formato de datos recibidos no es un arreglo.");
      }
    } catch (err) {
      console.error("Error al obtener los títulos: ", err);
      setError("No se pudieron obtener los títulos. Por favor, inténtalo más tarde.");
    }
  };
  const selectUserTitle = (title_id) => {
    console.log("Es necesario enviar el title_id para actualizar ese campo en user, solo ese", title_id);
  };



  return (
    <div className="notif-container">
      <h2>Títulos</h2>
      {error && <p>{error}</p>}
      {titles.length > 0 ? (
        <div className="notif-table-container">
          <table className="notif-table">
            <thead>
              <tr>
                <th className="notif-date-header">Título</th>
                <th className="notif-date-header">Seleccionar título</th>
              </tr>
            </thead>
            <tbody>
              {titles.map((title, index) => (
                <tr key={title.title_id}>
                  <td className="notif-date-cell">{title.title_name}</td>
                  <td
                    className="notif-name-cell"
                    onClick={() => selectUserTitle(title.title_id)}
                  >
                    <div
                      className="titl-circle-check"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {hoveredIndex === index ? (
                        <FaCheckCircle size={40} />
                      ) : (
                        <FaRegCircle size={40} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No tienes ningún título.</p>
      )}
    </div>
  );
};

export {
  BloqUser,
  PersoInfo,
  UserNotif,
  UserPermissions,
  UserTitles,
  UserConnections
};
