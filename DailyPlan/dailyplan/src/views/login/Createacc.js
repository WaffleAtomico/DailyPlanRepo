import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserExist, isValidEmail, EmailExist, NumberExist} from "../../utils/validations/user"
import { BdNoCon } from "../../components/advices/ErrorMsjs"
import axios from "axios";

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { IoReturnUpBackSharp } from "react-icons/io5";
import '../../styles/start/general.css';
import '../../styles/start/createacc.css';

// NOTA: Puedes pasar la informacion necesaria para iniciar sesión cuando la información de crear cuenta es correcta
// Para que sea mas facil para el usuario acceder a la cuenta que acaba de crear

export default function Create_acount(props) {
  const form = useRef();

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    number: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleUserInfoChange = (e) => {
    if (e.target.name === 'number') {
      let value = e.target.value;
      
      if (value.startsWith('+52 ')) {
        value = value.substring(4);
      }
      // Deja solo los primeros 10 dígitos
      const cleaned = ('' + value).replace(/\D/g, '').substring(0, 10);
      // Formatea el número con espacios
      const formatted = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3');
      setUserInfo({
        ...userInfo,
        [e.target.name]: formatted,
      });
    } else {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value,
      });
    }
  };
/*
user3
33 1234 5779
testusr3@gmail.com
123
123
*/
  const sendForm = async (e) => {
    e.preventDefault();
    const emailExist = await EmailExist(userInfo.email);
    const numberExists = await NumberExist(userInfo.number);
    if (isValidEmail(userInfo.email) && !emailExist) {
      if (userInfo.newPassword == userInfo.confirmPassword) {
        if(!numberExists || userInfo.number.length() < 10) {
            const userInfoToSend = {  
              user_mail: userInfo.email,
              user_name: userInfo.name,
              user_password: userInfo.newPassword,
              user_number: userInfo.number.replace(/\s/g, ""),
              user_status: 1
          };
          const validateInfo =
          {
            user_mail: userInfo.email,
            user_password: userInfo.newPassword
          }

          // console.log(userInfoToSend);
          try {
            await axios.post("http://localhost:3001/users", userInfoToSend);
            const user_id = await UserExist(validateInfo);
            if(user_id >= 0)
            {
              console.log(user_id);
              await axios.post("http://localhost:3001/title-addAll", { user_id })
            }
            navigate("/login");
            // form.current.reset();
            // console.log("user created");
          } catch (err) {
            console.log(err);
          }          
          form.current.reset();
          // navigate(`/create_acount`);
        } else {
            alert("Ya existe una cuenta con ese número");
          }        
      } else {
        alert("Las contraseñas no coinciden");
      }
    } else {
      alert("Correo electrónico inválido");
    }
  };



  return (
    <>
    <form ref={form} className="form">
      <div className="create-block">
        <Link to="/login">
          <Badge bg="secondary"> <IoReturnUpBackSharp /> </Badge>
        </Link>
        <h1>Crear cuenta</h1>
        <div className="create-form">
          <Form.Control size="lg" type="text" name="name" placeholder="Nombre"
            // value={userInfo.name}
            style={{
              backgroundColor: 'rgba(0, 141, 205, 0.55)',
              borderRadius: '20px',
              margin: '10px 0',
              border: '1px solid black',
            }}
            maxLength="15"
            onChange={handleUserInfoChange} required
          />
          <Form.Control size="lg" type="text" name="number" placeholder="Numero telefonico"
            value={'+52 ' + userInfo.number}
            style={{
              backgroundColor: 'rgba(0, 141, 205, 0.55)',
              borderRadius: '20px',
              margin: '10px 0',
              border: '1px solid black',
            }}
            onChange={handleUserInfoChange} required
          />
          <Form.Control size="lg" type="email" name="email" placeholder="Correo electrónico"
            // value={userInfo.email}
            style={{
              backgroundColor: 'rgba(0, 141, 205, 0.55)',
              borderRadius: '20px',
              margin: '10px 0',
              border: '1px solid black',
            }}
            onChange={handleUserInfoChange} required
          />
          <Form.Control size="lg" type="password" name="newPassword" placeholder="Contraseña"
            // value={userInfo.newPassword}
            style={{
              backgroundColor: 'rgba(0, 141, 205, 0.55)',
              borderRadius: '20px',
              margin: '10px 0',
              border: '1px solid black',  
            }}
            maxLength="30"
            onChange={handleUserInfoChange} required
          />
          <Form.Control size="lg" type="password" name="confirmPassword" placeholder="Repite tu contraseña"
            // value={userInfo.confirmPassword}
            style={{
              backgroundColor: 'rgba(0, 141, 205, 0.55)',
              borderRadius: '20px',
              margin: '10px 0',
              border: '1px solid black',
            }}
            onChange={handleUserInfoChange} required
          />
        </div>
        {/* <Link to="/login"> */}
        <div className="d-grid gap-2">
          <Button variant="success" size="lg" style={{ borderRadius: '0px 0px 8px 8px', margin: '0px' }}
          onClick={sendForm} >
            Iniciar sesión
          </Button>
        </div>
        {/* </Link> */}
      </div>
    </form>
  <BdNoCon />
  </>
  );
}