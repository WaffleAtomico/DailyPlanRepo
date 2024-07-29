import React, { useState, useEffect } from "react";
import { getAllArchivements, grantArchivement, isCompleted } from "../../../utils/archivements/grantArchivement";
import { useNavigate } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import RealTimeLocationComponent from "../../../utils/components/location/RealTimeLocation";
import { delUserBlocked, getUsersBlocked } from "../../../utils/validations/blockedurs";
import { RiUserForbidLine } from "react-icons/ri";
import { FaCheckCircle, FaRegCircle, FaSpotify, FaUserCheck } from 'react-icons/fa';

import { SpotifyApiContext } from 'react-spotify-api';
import Cookies from 'js-cookie';
import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';

import "../../../styles/UI/profile/configOptions.css";
import "../../../styles/UI/profile/notifView.css";
import "../../../styles/UI/profile/profileInfo.css";
import { addPermission, getPermissionById } from "../../../utils/validations/permission";
import { updateUserTitle } from "../../../utils/validations/user";
import { myPojo } from "../../../utils/ShowNotifInfo";
import { GoGear } from "react-icons/go";
import { getUserNotifications } from "../../../utils/validations/notification";



const PersoInfo = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Nombre Usuario');
  const [showConfirmation, setShowConfirmation] = useState(false);
  // const [isChecked, setIsChecked] = useState(false);

  const handleDeleteAccount = () => {
    console.log('Cuenta eliminada');
    navigate("/login");
  };

  // const handleCheckboxChange = (checked) => {
  //   setIsChecked(checked);
  //   console.log('Checkbox in PersoInfo is now', checked);
  // };

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
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    getBlockedUsers(props.id);
    console.log(blockedUsers);
  }, [props.id]);

  const getBlockedUsers = (user_id) => {
    getUsersBlocked(user_id).then(blockedUsersData => {
      setBlockedUsers(blockedUsersData.data);
      console.log(blockedUsersData.data);
    }).catch(err => { console.log(err) });
  };

  const handleUnblock = (userblocked_id, user_mail) => {
    console.log(userblocked_id);
    delUserBlocked(userblocked_id).then(res => {
      if (res.status) {
        getBlockedUsers(props.id);
        myPojo.setNotif(`Has desbloqueado a: ${user_mail}`, <></>);
      }
    }).catch(err => { console.log(err) })
  }

  return (
    <div style={{ backgroundColor: "#f0f0f0" }} className="notif-container">
      <h2 className="notif-title">Usuarios bloqueados: {blockedUsers.length ? blockedUsers.length : 0} </h2>
      {blockedUsers.length > 0 ? (
        <div className="notif-table-container">
          <table className="notif-table">
            <thead>
              <tr>
                <th className="notif-date-header">Usuario</th>
                <th className="notif-date-header">Desbloquear</th>
              </tr>
            </thead>
            <tbody>
              {blockedUsers.map((blockedUsr) => (
                <tr key={blockedUsr.user_id_target}>
                  <td className="otif-date-cell">{blockedUsr.user_mail}</td>
                  <td className="otif-date-cell">
                    <div className="titl-circle-check"
                      onClick={() => handleUnblock(blockedUsr.userblocked_id, blockedUsr.user_mail)}
                      onMouseEnter={() => setHoveredIndex(blockedUsr.user_id_target)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {hoveredIndex === blockedUsr.user_id_target ? (
                        <FaUserCheck size={40} />
                      ) : (
                        <RiUserForbidLine size={40} />
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No tienes bloqueado a ningún usuario.</p>
      )}
    </div>
  );
};

const UserNotif = (props) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = () => {
      getUserNotifications(props.id).then(res => {
        if (res.status) {
          console.log(res.data);
          const notifs = res.data;
          const newNotifs = notifs.map(item => ({
            id: item.notification_id,
            date: new Date(item.notification_date).toISOString().split('T')[0],
            name: item.notification_name,
          }));
          setNotifications(prevNotifications => {
            if (!prevNotifications.some(notif => notif.id === newNotifs.id)) {
              return [...prevNotifications, newNotifs];
            }
            return prevNotifications;
          });
        }
      }).catch(err => { console.log(err) })
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
  const [token, setToken] = React.useState(Cookies.get("spotifyAuthToken"))
  //cambiar a como sea necesario para llamar a la funcion de conexion
  return (
    <div className="user-connections">
      <h2>Conexiones</h2>
      {token ? (
        <SpotifyApiContext.Provider value={token}>
          {/* Your Spotify Code here */}
          <p>You are authorized with token: {token}</p>
        </SpotifyApiContext.Provider>
      ) : (
        // Display the login page
        <SpotifyAuth
          redirectUri='http://localhost:3000/callback'
          clientID='1a70ba777fec4ffd9633c0c418bdcf39'
          scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
          onAccessToken={(token) => setToken(token)}
        />
      )}
    </div>
  );
};
/*
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
*/


//Componente que sirve para obtener los permisos de ubicación de la persona

const UserPermissions = (props) => {
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user's current permission status when the component mounts
    getPermissionById(props.id).then(data => {
      if (data && data.length > 0 && data[0].permision_active === 1) {
        console.log("Obtener el permiso:", data[0]);
        setLocationPermission(true);
        fetchUserLocation();
      }
    });
  }, [props.id]);

  const handlePermissionToggle = () => {
    const permission = {
      permision_active: locationPermission ? 0 : 1,
      user_id: props.id
    };

    if (!locationPermission) {
      // If the permission is being turned on, fetch the location and then update the DB
      fetchUserLocation(permission);
    } else {
      // If the permission is being turned off, update the DB and reset the location state
      addPermission(permission);
      setLocationPermission(false);
      setUserLocation(null);
    }
  };

  const fetchUserLocation = (permission) => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocationPermission(true);
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
        setError(null);
        if (permission) addPermission(permission); // Update DB after getting location
      },
      error => {

        setError('No se pudo obtener la ubicación. Quite el bloqueo del navegador');
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
  const [error, setError] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isCompletedArchivement, setIsCompletedArchivement] = useState(true);


  useEffect(() => {
    getUserArchivement(props.id);
    confirmArchivement(props.id);
  }, [props.id]);

  const getUserArchivement = async (user_id) => {
    try {
      const res = await getAllArchivements(user_id);
      const titlesData = res.data;
      // console.log("Títulos recibidos: ", titlesData);
      if (Array.isArray(titlesData)) {
        const validTitles = [];
        titlesData.forEach(title => {
          if (title.title_done === 1) {
            validTitles.push(title);
          }
        });
        // console.log("Títulos válidos: ", validTitles);
        setTitles(validTitles);
      } else {
        throw new Error("El formato de datos recibidos no es un arreglo.");
      }
    } catch (err) {
      console.error("Error al obtener los títulos: ", err);
      setError("No se pudieron obtener los títulos. Por favor, inténtalo más tarde.");
    }
  };

  const confirmArchivement = (user_id) => {
    const grant_title_id = 12;
    isCompleted(user_id, grant_title_id).then(response => {
      // console.log("IsCompleted", response);
      if (response == false) {
        // console.log("Si es falso?", response)
        setIsCompletedArchivement(response);
      }
    }).catch(error => {
      console.error("Error confirming achievement: ", error);
    });
  }

  const grant13Archivement = (user_id) => {
    const grant_title_id = 13;
    console.log("Is completed:? ", isCompletedArchivement);
    if (!isCompletedArchivement) { //si no esta completado hay que entregarlo
      grantArchivement(user_id, grant_title_id).then(res => {
        myPojo.setNotif("Logro: TITULADO", <GoGear size={220} />);
        setIsCompletedArchivement(true);
      }).catch(error => {
        console.error("Error granting achievement:", error);
      });
    }
    // }).catch(err => { console.log(err) })
  };

  const selectUserTitle = (title_id, title_name) => {
    updateUserTitle(title_id, props.id).then(res => {
      if (res.status) {
        if (!isCompletedArchivement) {
          grant13Archivement(props.id);
        } else {
          myPojo.setNotif(`Asignaste: ${title_name}, como tu nuevo titulo`, <></>);
        }
      }
    })
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
                    onClick={() => selectUserTitle(title.title_id, title.title_name)}
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
