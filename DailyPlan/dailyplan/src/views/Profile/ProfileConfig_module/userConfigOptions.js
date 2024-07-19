import React, { useState, useEffect } from "react";
import { getAllArchivements } from "../../../utils/archivements/grantArchivement";
import { CiCircleCheck } from "react-icons/ci";
import RealTimeLocationComponent from "../../../utils/components/location/RealTimeLocation";
import { getUsersBlocked } from "../../../utils/validations/blockedurs";
import { RiUserForbidLine } from "react-icons/ri";
import { FaSpotify } from 'react-icons/fa';

import "../../../styles/UI/profile/configOptions.css";


const PersoInfo = (props) => {


  //debe de permtir al usuario ver su info personal, y cambiar su usuario unas cuentas veces
  //Revisar el requerimiento funcional o no funcional
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <h2>Información personal</h2>
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

const UserNodif = (props) => {
  //mostrar avisos, como: Invitaciones, Titulos, y como + Reinicios semanales
  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <h2>Notificaciones</h2>

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

const UserPermissions = () => {
  //Preguntar solo 1 vez, si permite acceder a la ubicacion, de hecho
  //IDEA: Solo cuando funcione la API de google maps, va a preguntar, si en este campo
  //lo marco como denegado, significa que no esta permitido, por medio del sistema
  /*Explico a detalle, no es solo el permiso del navegador, es saber si permite
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
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <h2>Títulos</h2>
      {error && <p>{error}</p>}
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
                <td className="titl-table-cell" onClick={() => selectUserTitle(title.title_id)}>
                  <div className="titl-circle-check">
                    <CiCircleCheck />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tienes ningún título.</p>
      )}
    </div>
  );
};

export {
  BloqUser,
  PersoInfo,
  UserNodif,
  UserPermissions,
  UserTitles,
  UserConnections
};
