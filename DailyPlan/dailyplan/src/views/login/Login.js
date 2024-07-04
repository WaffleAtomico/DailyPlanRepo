import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserExist } from "../../utils/validations/user";
import { BdNoCon } from "../../components/advices/ErrorMsjs";
import axios from "axios";

//design
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { IoHomeSharp } from "react-icons/io5";
import "../../styles/start/general.css";
import "../../styles/start/login.css";

import { AuthContext } from "../../services/AuthContext";

// actions

export default function Login(props) {
  const form = useRef();
  const navigate = useNavigate();
  const [userInfoLogin, setUserInfoLogin] = useState({
    user_mail: "",
    user_password: "",
  });
  const { login } = useContext(AuthContext);

  const handleUserInfoChange = (e) => {
    setUserInfoLogin({
      ...userInfoLogin,
      [e.target.name]: e.target.value,
    });
    console.log(userInfoLogin);
  };

  const HandleLogin = (e) => {
    e.preventDefault();
    // try {
    // const response = await axios.post("http://localhost:3001/login", userInfoLogin);

    // login(response.data.token);
    UserExist(userInfoLogin).then(userExist => {
      navigate(`/dailyplan/${userExist.data.id}`);
    }).catch(error => {
      console.error(error);
    });

    // } catch (error) {
    //   console.error("Error al intentar login:", error);
    //   form.current.reset();
    // }

    // const userExist = await UserExist(userInfoLogin);
    // // const emailExist = await EmailExist(userInfo.email);
    // console.log(userExist);
    // if (userExist >= 0) {
    //   // console.log(userExist)
    //   const token = jwt.sign({ userInfoLogin }, SECRET_KEY, {
    //     expiresIn: "1h",
    //   });
    //   alert("token" + token);
    //   navigate(`/dailyplan/${userExist}/`);
    // } else {
    //   form.current.reset();
    //   alert("Credenciales inválidas");
    //   navigate("/login");
    // }
  };

  return (
    <>
      <form ref={form} className="form">
        <div className="login-block">
          <Link to="/">
            <Badge bg="secondary">
              {" "}
              <IoHomeSharp />{" "}
            </Badge>
          </Link>
          <h1>Inicio de sesión </h1>
          <Form.Control
            size="lg"
            type="text"
            name="user_mail"
            placeholder="Correo electrónico"
            style={{
              backgroundColor: "rgba(0, 141, 205, 0.55)",
              borderRadius: "20px",
              margin: "10px 0",
              border: "1px solid black",
            }}

            onChange={handleUserInfoChange}
          />
          <Form.Control
            size="lg"
            type="password"
            name="user_password"
            placeholder="Contrase&ntilde;a"
            style={{
              backgroundColor: "rgba(0, 141, 205, 0.55)",
              borderRadius: "20px",
              margin: "10px 0",
              border: "1px solid black",
            }}
            onChange={handleUserInfoChange}
          />

          <div className="login-action">
            <Link to="/create_acount">
              <Button
                variant="outline-success"
                style={{ border: "2px solid", borderRadius: "20px" }}
              >
                Crear cuenta
              </Button>
            </Link>
            <Button
              variant="success"
              style={{ borderRadius: "20px" }}
              onClick={HandleLogin}
            >
              Iniciar sesión
            </Button>
          </div>
          <Link to="/recover_pwd">
            <Button variant="link"> Recuperar contraseña </Button>
          </Link>
        </div>
      </form>
      <BdNoCon />
    </>
  );
}
