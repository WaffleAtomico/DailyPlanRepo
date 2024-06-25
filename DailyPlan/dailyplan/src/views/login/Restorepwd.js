import { useRef, useState } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { BdNoCon } from "../../components/advices/ErrorMsjs"


import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IoReturnUpBackSharp  } from "react-icons/io5";
import '../../styles/start/general.css'; 
import '../../styles/start/createacc.css';


export default function Restore_pwd(props) {

    const form = useRef();
    const navigate  = useNavigate();
    // Para usarlo luego
    const { email } = useParams();

    const [user_newpwd, setNewpwd] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNewPassword = (e) => {
        setNewpwd(e.target.value);
        console.log(user_newpwd);
    };      
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        console.log(confirmPassword);
      };
    const sendForm = (e) => {
        // props.user_mail
        e.preventDefault();
        console.log("email actual: " + email);
        if(user_newpwd === confirmPassword)
        {
            alert("Formulario enviado");
            form.current.reset();
            navigate("/login");
        }
    }

    return (
        <>
        <form ref={form} onSubmit={sendForm} className="form">
        <div className="create-block">                          
            <Link to="/login">                    
                    <Badge bg="secondary"> <IoReturnUpBackSharp  /> </Badge>                                   
            </Link>
            <h1>Recuperar contraseña</h1>
            <div className="create-form">
           
                <Form.Control size="lg" type="password" placeholder="Contraseña nueva" style={{
                        backgroundColor: 'rgba(0, 141, 205, 0.55)', 
                        borderRadius: '20px',
                        margin: '10px 0',
                        border: '1px solid black', 
                    }} onChange={handleNewPassword} />

                <Form.Control size="lg" type="password" placeholder="Repite tu contraseña" style={{
                    backgroundColor: 'rgba(0, 141, 205, 0.55)', 
                    borderRadius: '20px',
                    margin: '10px 0',
                    border: '1px solid black', 
                }} onChange={handleConfirmPassword} /> 

            </div>
                {/* <Link to="/login"> */}
                <div className="d-grid gap-2">                  
                    <Button variant="success" size="lg"
                     style={{borderRadius: '0px 0px 8px 8px', margin: '0px'}} onClick={sendForm}>
                        Enviar correo
                    </Button>                                        
                </div>
                {/* </Link>                      */}
        </div>          
    </form>
    <BdNoCon />
    </>
    );
}
