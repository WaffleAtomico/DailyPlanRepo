import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, EmailExist, getUsrByEmail, enviaCorreo} from "../../utils/validations/user"
import { BdNoCon } from "../../components/advices/ErrorMsjs"

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { IoReturnUpBackSharp } from "react-icons/io5";
import "../../styles/start/general.css";
import "../../styles/start/createacc.css";

export default function Recover_pwd(props) {
  const form = useRef();
  const navigate = useNavigate();
  const [user_mail, setEmail] = useState("");

  const handlEmail = (e) => {
    setEmail(e.target.value);
    //console.log(user_mail);
  };
  
  const randomNumberInRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const paso2 = (user_mail) => {
	  const storedCount = localStorage.getItem('recuperacion');
	  var count = storedCount ? parseInt(storedCount) : 0;
	  if (count < 100) {
		count = count + 1;
		localStorage.setItem('recuperacion',count);
		
		var datausr = getUsrByEmail(user_mail);
		
		datausr.then(response => {
			if (response.status === 200 && response.data.length > 0)
			{
				var nombre = response.data[0].user_name;
				var codigo = '';
				for (var i=0; i < 8; i++) {
					codigo += randomNumberInRange(0, 9);
				};
				localStorage.setItem('rec-codigo',codigo);
				localStorage.setItem('rec-correo',user_mail);
				var correoresult = enviaCorreo(user_mail,nombre, codigo);
				
				correoresult.then(response => {
					//console.log("E0 " + response.status);
					if (response.status === 200)
					{
						if (response.data.msg === 'success') {
						  alert('Correo de recuperacion te ha sido enviado');
						  form.current.reset();
						  navigate(`/restore_pwd/${user_mail}`);
						} else if(response.data.msg === 'fail') {
						  alert('Hubo un problema al enviar correo, intente mas tarde');
						}
					} else {
						console.error(response.statusText);
					}
				})
				.catch(function(error) {
					console.error ( error );
				})
			} else {
				console.error(response.statusText);
			}
          })
          .catch(function(error) {
             console.error ( error );
          })
	  } else {
		alert("Excedidos los intentos de recuperacion");
	  }
  }
  
  const sendForm = (e) => {
      e.preventDefault();
      // Ask if the mail exist
	  var emailvalid = isValidEmail(user_mail);	  
	  if (emailvalid)
	  {
		//console.log(user_mail);
		var emailexist = EmailExist(user_mail);	
		
		emailexist.then(response => {
             //console.log("B1 " + response.data.exists);
			 if (response.data.exists)
			 {
				paso2(user_mail);
			 } else {
				 alert("Cuenta de correo electronico no registrada");
			 }
          })
          .catch(function(error) {
             console.error ( error );
			 //console.log("B2 " + error.response);
          })
	  } else
	  {
		alert("Ingresa un correo electronico")
	  }
  }

  

  return (
    <>
      <form ref={form} onSubmit={sendForm} className="form">
        <div className="create-block">
          <Link to="/login">
            <Badge bg="secondary">
              {" "}
              <IoReturnUpBackSharp />{" "}
            </Badge>
          </Link>
          <h1>Recuperar contraseña</h1>
          <div className="create-form">
            <Form.Control
              size="lg"
              type="mail"
              placeholder="Correo electrónico"
              style={{
                backgroundColor: "rgba(0, 141, 205, 0.55)",
                borderRadius: "20px",
                margin: "10px 0",
                border: "1px solid black",
              }}
              onChange={handlEmail}
            />

            <Alert variant="success">
              <Alert.Heading> Aviso! </Alert.Heading>
              <p>
                Se enviará un correo a la dirección que se agregue,{" "}
                <strong>mientras exista una cuenta </strong>
                dada de alta con ese correo
              </p>
              <hr />
            </Alert>
          </div>
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
        </div>
      </form>
      <BdNoCon />
    </>
  );
}
