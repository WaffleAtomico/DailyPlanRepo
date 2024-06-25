import { useState } from "react";
import '../../styles/UI/profile/profconfig.css';
import { useNavigate } from 'react-router-dom';



export default function ProfileConfig_view(props) {

    const navigate  = useNavigate();
    const [widthmenui, setWidthmenui] = useState(100)
    const [optionselected, setOptionselected] =useState(0);

    const RenderOption = () => 
    {
        // console.log("opcion: " + optionselected);
        switch (optionselected) {
            // case 0:
            //     return (<>Nadota</>)
            case 1:
                return (<>Info personal</>)
            case 2:
                return (<>Títulos</>)
            case 3:
                return (<>Permisos</>)
            case 4:
                return (<>Usuarios bloqueados</>)
            case 5:
                return (<>Notificaciones</>)
            default:
                return (<>Nadota</>)
        }
    }

    const handleOptionSelected = (option) =>
    {
        if(option !== optionselected)
        {
            setWidthmenui(50);
            setOptionselected(option);
        }else
        {
            if(widthmenui === 100)
            {
                setWidthmenui(50) 
            }else
            {
                setWidthmenui(100);
                setOptionselected(0);
            }
            // (widthmenui === 100 ? setWidthmenui(50) : (setWidthmenui(100), setOptionselected(0) ));  
            // (widthmenui === 100 ? (setWidthmenui(50), setOptionselected(0)) : setWidthmenui(100));
        }
    }

    const closeSesion = () =>
    {
        navigate('/login');
    }

    return(
    <div className="menu-container">
        <ul className="menu-list" style={{width: `${widthmenui}%`}} >
            <li className="menu-item" onClick={() => handleOptionSelected(1)}>Información personal</li>
            <li className="menu-item" onClick={() => handleOptionSelected(2)}>Títulos</li>
            <li className="menu-item" onClick={() => handleOptionSelected(3)}>Permisos</li>
            <li className="menu-item" onClick={() => handleOptionSelected(4)}>Usuarios bloqueados</li>
            <li className="menu-item" onClick={() => handleOptionSelected(5)}>Notificaciones</li>
            <li className="menu-item-close" onClick={()=>closeSesion()} >Cerrar sesión</li>
        </ul>
        <div >
            {RenderOption()}
        </div>
    </div>
    );
}