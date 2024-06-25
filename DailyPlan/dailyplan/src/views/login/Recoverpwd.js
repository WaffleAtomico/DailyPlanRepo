import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidEmail, EmailExist} from "../../utils/validations/user"
import { BdNoCon } from "../../components/advices/ErrorMsjs"


import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { IoReturnUpBackSharp  } from "react-icons/io5";
import '../../styles/start/general.css'; 
import '../../styles/start/createacc.css';


export default function Recover_pwd(props) {

    const form = useRef();
    const navigate  = useNavigate();
    const [user_mail, setEmail] = useState("");

  const handlEmail = (e) => {
    setEmail(e.target.value);
    console.log(user_mail);
  };

  const sendForm = (e) => {
      e.preventDefault();
      // Ask if the mail exist
      if(isValidEmail(user_mail) && EmailExist(user_mail))
      {
          // alert("Formulario enviado");
          form.current.reset();
          navigate(`/restore_pwd/${user_mail}`);
      }else
      {
        alert("Ingresa un correo electronico")
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
            
            <Form.Control size="lg" type="mail" placeholder="Correo electrónico" style={{
                    backgroundColor: 'rgba(0, 141, 205, 0.55)', 
                    borderRadius: '20px',
                    margin: '10px 0',
                    border: '1px solid black', 
                  }} onChange={handlEmail} />

    <Alert variant="success">
      <Alert.Heading> Aviso! </Alert.Heading>
      <p>
        Se enviará un correo a la dirección que se agregue, <strong>mientras exista una cuenta </strong>
        dada de alta con ese correo 
      </p>
      <hr/>
    </Alert>
            </div>
                <div className="d-grid gap-2">                  
                    <Button variant="success" size="lg" style={{borderRadius: '0px 0px 8px 8px', margin: '0px'}}
                     onClick={sendForm} >Enviar correo
                    </Button>                                        
                </div>
        </div>          
    </form>
      <BdNoCon />
      </>
    );
}