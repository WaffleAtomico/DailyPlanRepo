import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BloqUser,
  PersoInfo,
  UserConnections,
  UserNodif,
  UserPermissions,
  UserTitles,
} from "./userConfigOptions";

import "../../../styles/UI/profile/profconfig.css";


export default function ProfileConfig_view(props) {
  const navigate = useNavigate();
  const [widthmenui, setWidthmenui] = useState(100);
  const [optionselected, setOptionselected] = useState(0);

  const RenderOption = () => {
    switch (optionselected) {
      case 1:
        return <PersoInfo id={props.user_id} />;
      case 2:
        return <UserTitles id={props.user_id} />;
      case 3:
        return <UserPermissions id={props.user_id} />;
      case 4:
        return <BloqUser id={props.user_id} />;
      case 5:
        return <UserNodif id={props.user_id} />;
      case 6:
        return <UserConnections id={props.user_id} />;
      default:
        return <></>;
    }
  };

  const handleOptionSelected = (option) => {
    if (option !== optionselected) {
      setWidthmenui(50);
      setOptionselected(option);
    } else {
      if (widthmenui === 100) {
        setWidthmenui(50);
      } else {
        setWidthmenui(100);
        setOptionselected(0);
      }
    }
  };

  const closeSesion = () => {
    navigate("/login");
  };

  return (
    <div className="menu-container" style={{ display: "flex" }}>
      <table className="menu-list" style={{ width: `${widthmenui}%` }}>
        <tbody>
          <tr>
            <td
              className={`menu-item ${optionselected === 1 ? "selected" : ""}`}
              onClick={() => handleOptionSelected(1)}
            >
              Información personal
            </td>
          </tr>
          <tr>
            <td
              className={`menu-item ${optionselected === 2 ? "selected" : ""}`}
              onClick={() => handleOptionSelected(2)}
            >
              Títulos
            </td>
          </tr>
          <tr>
            <td
              className={`menu-item ${optionselected === 3 ? "selected" : ""}`}
              onClick={() => handleOptionSelected(3)}
            >
              Permisos
            </td>
          </tr>
          <tr>
            <td
              className={`menu-item ${optionselected === 6 ? "selected" : ""}`}
              onClick={() => handleOptionSelected(6)}
            >
              Conexiones
            </td>
          </tr>
          <tr>
            <td
              className={`menu-item ${optionselected === 4 ? "selected" : ""}`}
              onClick={() => handleOptionSelected(4)}
            >
              Usuarios bloqueados
            </td>
          </tr>
          <tr>
            <td
              className={`menu-item ${optionselected === 5 ? "selected" : ""}`}
              onClick={() => handleOptionSelected(5)}
            >
              Notificaciones
            </td>
          </tr>
          <tr>
            <td className="menu-item-close" onClick={() => closeSesion()}>
              Cerrar sesión
            </td>
          </tr>
        </tbody>
      </table>

      {optionselected !== 0 && (
        <div style={{ width: "50%" }}>{RenderOption()}</div>
      )}
    </div>
  );
}
