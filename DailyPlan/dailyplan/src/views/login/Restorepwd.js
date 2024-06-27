import { useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BdNoCon } from "../../components/advices/ErrorMsjs";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoReturnUpBackSharp } from "react-icons/io5";
import "../../styles/start/general.css";
import "../../styles/start/createacc.css";

export default function Restore_pwd(props) {
  const form = useRef();
  const navigate = useNavigate();
  // Para usarlo luego
  const { email } = useParams();

    const form = useRef();
    const navigate  = useNavigate();
    // Para usarlo luego
    //const { email } = useParams();

    const [user_newpwd, setNewpwd] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
	const [verificationCode,setVerificationCode] = useState("");

    const handleNewPassword = (e) => {
        setNewpwd(e.target.value);
        //console.log(user_newpwd);
    };
	
    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        //console.log(confirmPassword);
    };
	  
	const handleVerificationCode = (e) => {
        setVerificationCode(e.target.value);
        //console.log(verificationCode);
    };
	
	var email;
	
	function SetMail() {
		let { id } = useParams();
		email = id;
		return (
        <div hidden>{id}</div>
		);
	}
	  
    const sendForm = (e) => {
        // props.user_mail
        e.preventDefault();
        //console.log("email actual: " + email);
		//console.log("codigo de verificacion: " + verificationCode);
		const storedCode = localStorage.getItem('rec-codigo');
		var code = storedCode ? storedCode : 'ABCDEFGH';
		const storedMail = localStorage.setItem('rec-correo');
		var semail = storedMail ? storedMail : '@@@@@@@';
		
		//console.log("Codigo en Session: " + code);
		
        if(code === verificationCode)
        {
            if(semail === email)
			{
				if(user_newpwd === confirmPassword)
				{
                    //Aqui hay que mandar actualizar la contraseña
                    //semail y user_newpwd
					alert("Cntraseña Actualizada");
					form.current.reset();
					navigate("/login");
				} else {
					alert("Cntraseñas Diferentes");
				}
			} else {
				alert("Cuenta de Correo Erronea");
			}
        } else {
            alert("Codigo de Verificacion Invalido o Caducado");
        }
    }
  };

    return (
        <>
        <form ref={form} onSubmit={sendForm} className="form">
        <div className="create-block">                          
            <Link to="/login">                    
                    <Badge bg="secondary"> <IoReturnUpBackSharp  /> </Badge>                                   
            </Link>
            <h1>Recuperar contraseña</h1>
			<SetMail />
            <div className="create-form">
           
                <Form.Control size="lg" type="password" placeholder="Codigo de Verificacion" style={{
                    backgroundColor: 'rgba(0, 141, 205, 0.55)', 
                    borderRadius: '20px',
                    margin: '10px 0',
                    border: '1px solid black', 
                }} onChange={handleVerificationCode} /> 
                <Form.Control size="lg" type="password" placeholder="Contraseña nueva" style={{
                        backgroundColor: 'rgba(0, 141, 205, 0.55)', 
                        borderRadius: '20px',
                        margin: '10px 0',
                        border: '1px solid black', 
                    }} onChange={handleNewPassword} />

            <Form.Control
              size="lg"
              type="password"
              placeholder="Repite tu contraseña"
              style={{
                backgroundColor: "rgba(0, 141, 205, 0.55)",
                borderRadius: "20px",
                margin: "10px 0",
                border: "1px solid black",
              }}
              onChange={handleConfirmPassword}
            />
          </div>
          {/* <Link to="/login"> */}
          <div className="d-grid gap-2">
            <Button
              variant="success"
              size="lg"
              style={{ borderRadius: "0px 0px 8px 8px", margin: "0px" }}
              onClick={sendForm}
            >
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
