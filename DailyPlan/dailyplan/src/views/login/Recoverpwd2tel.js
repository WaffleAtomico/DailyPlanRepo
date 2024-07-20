import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isValidTelefono, NumberExist, getUsrByPhone, enviaCorreojt } from "../../utils/validations/user"
import { BdNoCon } from "../UI/advices/ErrorMsjs";

import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import { IoReturnUpBackSharp, IoMail } from "react-icons/io5";
import '../../styles/start/general.css';
import '../../styles/start/createacc.css';
import { CustomLocalStorage, duracionVariables } from '../../utils/CustomLocalStorage.js';

export default function Recover_pwdtel(props) {

	const form = useRef();
	const navigate = useNavigate();
	const [user_phone, setPhone] = useState("");

	const handlPhone = (e) => {
		setPhone(e.target.value);
		//console.log(user_mail);
	};

	const generateRandomCode = (length) => {
		const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		let result = '';
		for (let i = 0; i < length; i++) {
		  const randomIndex = Math.floor(Math.random() * characters.length);
		  result += characters[randomIndex];
		}
		return result;
	};

	const customLocalStorage = new CustomLocalStorage();

	const paso2 = (user_number) => {

		var datausr = getUsrByPhone(user_number);

		datausr.then(response => {
			//console.log("A7 " + response.status);
			if (response.status === 200 && response.data.length > 0) {
				var nombre = response.data[0].user_name;

				var user_id = response.data[0].user_id;
				var user_number = response.data[0].user_number;
				var user_mail = response.data[0].user_mail;
				customLocalStorage.setItem("RecInt-correo",user_mail,duracionVariables);
				customLocalStorage.setItem("RecInt-number",user_number,duracionVariables);
				customLocalStorage.setItem("RecInt-id",user_id,duracionVariables);

				var codigo = generateRandomCode(5);

				customLocalStorage.setItem("RecInt-codigo",codigo,duracionVariables);

				var correoresult = enviaCorreojt(user_mail, nombre, codigo);

				correoresult.then(response => {
					//console.log("E0 " + response.status);
					if (response.status === 200) {
						if (response.data.msg === 'success') {
							alert('Correo de recuperacion te ha sido enviado');
							form.current.reset();
							navigate(`/restore_pwdtel/${user_number}`);
						} else if (response.data.msg === 'fail') {
							alert('Hubo un problema al enviar correo, intente mas tarde');
						}
					} else {
						console.error(response.statusText);
					}
				})
				.catch(function (error) {
					console.error(error);
				})
			} else {
				console.error(response.statusText);
			}
		})
		.catch(function (error) {
			console.error(error);
		})
	}

	const sendForm = (e) => {
		e.preventDefault();

		const asigInt = customLocalStorage.getItem("AsignaconIntentos");
		var countIntAsig = 0;
		if (asigInt != null) {
			countIntAsig = parseInt(asigInt);
		} else {
			customLocalStorage.setItem("AsignaconIntentos",countIntAsig,duracionVariables);
		}

		const recInt = customLocalStorage.getItem("RecuperaIntentos");
		var countInt = 0;
		if (recInt != null) {
			countInt = parseInt(recInt);
		} else {
			customLocalStorage.setItem("RecuperaIntentos",countInt,duracionVariables);
		}

		if (countInt < 4 && countIntAsig < 8) { //solo se permite 3 intentos de recuperacion y 7 de asignacion
			countInt = countInt + 1;
			customLocalStorage.setItem("RecuperaIntentos",countInt,duracionVariables);

			// Ask if the mail exist
			var phonevalid = isValidTelefono(user_phone);
			if (phonevalid) {
				NumberExist(user_phone).then(response => {
					//console.log("A3 " + response.data.exists);
					if (response.data.exists) {
						paso2(user_phone);
					} else {
						alert("Numero de teléfono no registrado");
					}
				}).catch(function (error) {
						console.error(error);
						//console.log("A4 " + error.response);
				})

			} else {
				alert("Ingresa un teléfono valido de 10 dígitos")
			}
		} else {
			alert("Excedidos los intentos de recuperacion");
		}
	}

	return (
		<>
			<form ref={form} onSubmit={sendForm} className="form">
				<div className="create-block">
					<Link to="/login">
						<Badge bg="secondary"> <IoReturnUpBackSharp /> </Badge>
					</Link>
					<h1>Recuperar contraseña (JT)</h1>
					<div className="create-form">

						<Form.Control size="lg" type="text" placeholder="Número de Teléfono"
							style={{
								backgroundColor: "rgba(0, 141, 205, 0.55)",
								borderRadius: "20px",
								margin: "10px 0",
								border: "1px solid black",
							}}
              				onChange={handlPhone} required />

						<Alert variant="success">
							<Alert.Heading> Aviso! </Alert.Heading>
							<p>
								Se enviará un correo a la dirección de correo asociado al teléfono que se ingrese, <strong>mientras exista una cuenta </strong>
								dada de alta con ese número
							</p>
							<hr />
							<p>
							<Link to="/recover_pwdtel">
								<Button variant="link" title="Usar Servidor MailTrap"><IoMail/></Button>
							</Link>
							-
							<Link to="/recover_pwdjt">
								<Button variant="link">Recuperar por correo <IoReturnUpBackSharp /></Button>
							</Link>
							</p>
						</Alert>
					</div>
					<div className="d-grid gap-2">
						<Button variant="success" size="lg" style={{ borderRadius: '0px 0px 8px 8px', margin: '0px' }}
							onClick={sendForm}>Enviar correo
						</Button>
					</div>
				</div>
			</form>
			<BdNoCon />
		</>
	);
}