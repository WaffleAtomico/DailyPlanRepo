import axios from "axios";
import { urllocalhost } from "../urlrequest";

export const saveUserClock = async (clockInfo) => {
  try {
    console.log(clockInfo);
    await axios.post(`${urllocalhost}/clock-id`, clockInfo); //deberia verificar si retorna un error
    // console.log(response.data.exists);
    return true;
  } catch (err) {
    console.log(err);
  }
  // }
};

export const getUserClocks = async (user_id) => {
  try {
    // console.log("userid from clock.js (front): "+ user_id);
    const response = await axios.post(`${urllocalhost}/clock-byid`, {user_id,});
    // console.log("Respuesta de clock.js (front): " + response.data); // ya funciona
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const delUserClock = async (clock_id) => {
  // const userExist = await UserExist(userInfoLogin);
  try {
    console.log("En funcion de clock.js (front) " + clock_id);
    const response = await axios.post(`${urllocalhost}/clock-iddel`, {clock_id,});
    // console.log(response.data.exists);
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const ZoneInUserExist = async (clockInfo) => {
  console.log(clockInfo);
  try {
    const response = await axios.post(`${urllocalhost}/clock-existzone`,clockInfo);
    console.log(response.data.exists); //true  si existe, false  no existe
    // return response.data.exists;
    return response;
  } catch (err) {
    console.log(err);
  }
};
