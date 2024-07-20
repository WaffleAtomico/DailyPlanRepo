import axios from 'axios';
import {
    CONN_URL,
    CREATE_USER_URL,
    UPDATE_USER_PWD_URL,
    USER_EXISTS_URL,
    USER_EXISTS_MAIL_URL,
    USER_EXISTS_NAME_URL,
    USER_EXISTS_NUMBER_URL,
    GET_USER_INFO_URL,
    GET_USER_BY_MAIL_URL,
    GET_USER_BY_PHONE_URL,
    SEND_MAIL_URL,
    SEND_MAILJT_URL
} from '../routes';

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const isValidTelefono = (phone) => {
    const telephonelRegex = /^\d{10}$/;
    return telephonelRegex.test(phone);
};

export const isDbConnected = async () => {
    try {
        //it must be at least the one user to work
        const response = await axios.get(CONN_URL);
        //   if(response.data.length == 0)
        //       throw new Error('no hay un usuario en base de datos')
        return response;
    } catch (err) {
        console.log(err);
        return "Error conectando a APIrest";
    }
};

// Campos que se deben enviar en userInfoToSend:
// user_name, user_mail, user_pass, user_image, user_number
export const UserAdd = async (userInfoToSend) => {
    try {
        const response = await axios.post(CREATE_USER_URL, userInfoToSend);
        return response;
    } catch (err) {
        console.log(err);
        return "Error creando un usuario";
    }
};

// Campos que se deben enviar en userInfoToSend:
// user_name, user_mail, user_pass, user_image, user_number
export const UserUpdPwd = async (userPwdInfoToSend) => {
    try {
        const response = await axios.post(UPDATE_USER_PWD_URL, userPwdInfoToSend);
        return response;
    } catch (err) {
        console.log(err);
        return "Error Actuando contraseña a usuario";
    }
};

// Campos que se deben enviar en userInfoLogin:
// user_mail, user_pass
export const UserExist = async (userInfoLogin) => {
    try {
        //console.log("Info recibida" + userInfoLogin);
        const response = await axios.post(USER_EXISTS_URL, userInfoLogin);
        // console.log(response.data.exists);
        // return response.data.id;
        return response;
    } catch (err) {
        console.log(err);
    }
};

// Campos que se deben enviar en user_mail:
// user_mail
export const EmailExist = async (user_mail) => {
    try {
        const response = await axios.post(USER_EXISTS_MAIL_URL, { user_mail });
        //console.log(response.data.exists); //true  si existe, false  no existe
        //return response.data.exists;
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const EmailExist_test = async (user_mail) => {
    try {
        const response = await axios.post(USER_EXISTS_MAIL_URL, { user_mail });
        //console.log(response); //true  si existe, false  no existe
        //console.log(response.data); //true  si existe, false  no existe
        //console.log(response.data.exists); //true  si existe, false  no existe
        //return response.data.exists;
        return response;
    } catch (err) {
        console.log(err);
    }
};

// Campos que se deben enviar en user_number:
// user_number
export const NumberExist = async (user_number) => {
    console.log(user_number);
    try {
        const response = await axios.post(USER_EXISTS_NUMBER_URL, { user_number });
        //console.log(response.data.exists); //true  si existe, false  no existe
        // return response.data.exists;
        return response;
    } catch (err) {
        return false;
    }
};

// Campos que se deben enviar en user_name:
// user_name
export const NameExist = async (user_name) => {
    console.log(user_name);
    try {
        const response = await axios.post(USER_EXISTS_NAME_URL, { user_name });
        // return response.data.exists;
        return response;
    } catch (err) {
        console.log(err);
    }
};

// Campos que se deben enviar en user_id:
// user_id
export const getUsrName = async (user_id) => {
    // console.log("id en funcion "+ user_id);
    try {
        const response = await axios.post(GET_USER_INFO_URL, { user_id });
        // console.log("User name: " + response.data);
        // console.log(Object.values(response.data));
        // return response.data[0]; //just one cause the query only give us one
        return response;
    } catch (err) {
        console.log(err);
    }
};

// Campos que se deben enviar en user_mail:
// user_mail
export const getUsrByEmail = async (user_mail) => {
    try {
        const response = await axios.post(GET_USER_BY_MAIL_URL, { user_mail });
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
};

// Campos que se deben enviar en user_phone:
// user_phone
export const getUsrByPhone = async (user_number) => {
    try {
        const response = await axios.post(GET_USER_BY_PHONE_URL, { user_number });
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
};

// Campos que se deben enviar en emailInfo:
// email, nombre, codigo
export const enviaCorreo = async (email, nombre, codigo) => {
    try {
        const response = await axios.post(SEND_MAIL_URL, { email, nombre, codigo });
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
};

export const enviaCorreojt = async (email, nombre, codigo) => {
    try {
        const response = await axios.post(SEND_MAILJT_URL, { email, nombre, codigo });
        //console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
};
