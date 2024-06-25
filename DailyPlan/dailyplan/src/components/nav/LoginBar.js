import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../../styles/start/startpage.css';


export default function Header_startpage() {
    return(
        <>
         <div className="startpage-header">
            <div  className="startpage-components">
                <h1>
                    <strong > Daily Plan </strong>
                </h1>
                    <Link to="/login">
                        <Button variant="outline-success" size="lg">Iniciar sesión</Button>          
                    </Link>
            </div>
        </div>
        </>   
    );
}