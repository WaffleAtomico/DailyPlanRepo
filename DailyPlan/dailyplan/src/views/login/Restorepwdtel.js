import { useRef, useState } from "react";
import { Link, useNavigate, useParams  } from "react-router-dom";
import { UserUpdPwd } from "../../utils/validations/user.js"
import { BdNoCon } from "../UI/advices/ErrorMsjs.js";

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { IoReturnUpBackSharp  } from "react-icons/io5";
import '../../styles/start/general.css'; 
import '../../styles/start/createacc.css';
import { CustomLocalStorage, duracionVariables } from '../../utils/CustomLocalStorage.js';

export default function Restore_pwd(props) {

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

    const customLocalStorage = new CustomLocalStorage();

	var numberPhone;

	function SetNumber() {
		let { id } = useParams();
		numberPhone = id;
		return (
        <div hidden>{id}</div>
		);
	}

    const sendForm = (e) => {
        // props.user_mail
        e.preventDefault();

        const asigInt = customLocalStorage.getItem("AsignaconIntentos");
		var countIntAsig = 0;
		if (asigInt != null) {
			countIntAsig = parseInt(asigInt);
		} else {
			customLocalStorage.setItem("AsignaconIntentos",countIntAsig,duracionVariables);
		}
		if (countIntAsig < 8) { //solo se permite 7 intentos de recuperacion
			countIntAsig = countIntAsig + 1;
			customLocalStorage.setItem("AsignaconIntentos",countIntAsig,duracionVariables);

            const storedCode = customLocalStorage.getItem("RecInt-codigo");;
            var code = storedCode ? storedCode : 'ABCDEFGH';
            const storedMail = customLocalStorage.getItem("RecInt-correo");
            var semail = storedMail ? storedMail : '@@@@@@@';
            const storedNumber = customLocalStorage.getItem("RecInt-number");
            var snumber = storedNumber ? storedNumber : '0';
            const storedID = customLocalStorage.getItem("RecInt-id");
            var sid = storedID ? storedID : '0';

            if(code === verificationCode)
            {
                if(snumber === numberPhone)
                {
                    if(user_newpwd.length > 3 && user_newpwd.length < 41)
                    {
                        if(user_newpwd === confirmPassword)
                        {
                            const userPwdInfoToSend = {
                                user_password: user_newpwd,
                                user_id: sid,
                            };
                            var updStatus = UserUpdPwd(userPwdInfoToSend);
                            updStatus.then(response => {
                                //console.log("E0 " + response.status);
                                if (response.status === 200) {
                                    if (response.data.result === true) {
                                        alert("Contraseña Actualizada");
                                        form.current.reset();
                                        navigate("/login");
                                    } else if (response.data.result === false) {
                                        alert('Hubo un problema al actualizar la contraseña, intente mas tarde');
                                    }
                                } else {
                                    console.error(response.statusText);
                                }
                            })
                            .catch(function (error) {
                                console.error(error);
                            })
                        } else {
                            alert("Contraseñas Diferentes");
                        }
                    } else {
                        if(user_newpwd.length > 3)
                        {
                            alert("Longuitud de Contraseñas Minimo 3 caracteres");
                        } else {
                            alert("Longuitud de Contraseñas Maxima 40 caracteres");
                        }
                    }
                } else {
                    alert("Numero de Telefono Erroneo");
                }
            } else {
                alert("Codigo de Verificacion Invalido o Caducado");
            }
        } else {
			alert("Excedidos los intentos de verificaciones");
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
			<SetNumber />
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
