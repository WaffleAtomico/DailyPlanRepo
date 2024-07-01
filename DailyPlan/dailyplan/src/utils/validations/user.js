import axios from "axios";
import { urllocalhost } from "../urlrequest";

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isDbConnected = async () => {
  try {
    //it must be at least the one user to work
    const response = await axios.get(`${urllocalhost}/conn`);
    return response.data.connected;
  } catch (err) {
    console.log(err);
    return "Error conectando a APIrest";
  }
};

//

export const UserExist = async (userInfoLogin) => {
  try {
    console.log("Info recibida" + userInfoLogin);
    const response = await axios.post(
      `${urllocalhost}/users-exist`,
      userInfoLogin
    );
    // console.log(response.data.exists);
    return response.data.id;
  } catch (err) {
    console.log(err);
  }
};

export const EmailExist = async (user_mail) => {
  console.log("Emailexist "+user_mail);
  try {
    const response = await axios.post(`${urllocalhost}/users-existmail`, { user_mail });
    // console.log(response.data.exists); //true  si existe, false  no existe
    return response;
  } catch (err) {
    // return false;
  }
};

export const NumberExist = async (user_number) => {
  console.log("Numberu" + user_number);
  try {
    const response = await axios.post(`${urllocalhost}/users-existnumber`, { user_number });
    console.log(response.data.exists); //true  si existe, false  no existe
    return response.data.exists;
  } catch (err) {
    return false;
  }
};

export const NameExist = async (user_name) => {
  console.log(user_name);
  try {
    const response = await axios.post(`${urllocalhost}/users-existname`, {
      user_name,
    });
    return response.data.exists;
  } catch (err) {
    console.log(err);
  }
};

export const getUsrName = async (user_id) => {
  // console.log("id en funcion "+ user_id);
  try {
    const response = await axios.post(`${urllocalhost}/get-userinfo`, {
      user_id,
    });
    // console.log("User name: " + response.data);
    // console.log(Object.values(response.data));
    return response.data[0]; //just one cause the query only give us one
  } catch (err) {
    console.log(err);
  }
};

export const getUsrByEmail = async (user_mail) => {
  console.log(user_mail);
  try {
    const response = await axios.post(`${urllocalhost}/user-bymail`, { user_mail });
    console.log(response);
    return response;
  } catch (err) {
    return false;
  }
}

export const enviaCorreo = async (email, nombre, codigo) => 
  {
    try {
		const response = await axios.post(`${urllocalhost}/send`, { email, nombre, codigo });
		console.log("Fucnion "+response);
		return response;
    } catch (err) {
		console.log(err);
    }
  }
