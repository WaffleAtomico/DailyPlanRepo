import axios from "axios";
import { urllocalhost } from "../urlrequest";

export const saveUserClock = async (clockInfo) => {
  // const userExist = await UserExist(userInfoLogin);
  // console.log(props.id_user);
  // if (zonaHoraria1 && zonaHoraria2) {
  //     const clockInfo = {
  //         clock_name: zonaHoraria2,
  //         user_id: props.id_user
  //     }
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
  // const userExist = await UserExist(userInfoLogin);
  // console.log(props.id_user);
  // const user_id = props.id_user

  try {
    // console.log("userid from clock.js (front): "+ user_id);
    const response = await axios.post(`${urllocalhost}/clock-byid`, {
      user_id,
    });
    // console.log("Respuesta de clock.js (front): " + response.data); // ya funciona
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const delUserClock = async (clock_id) => {
  // const userExist = await UserExist(userInfoLogin);
  try {
    console.log("En funcion de clock.js (front) " + clock_id);
    const response = await axios.post(`${urllocalhost}/clock-iddel`, {
      clock_id,
    });
    // console.log(response.data.exists);
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const ZoneInUserExist = async (clockInfo) => {
  console.log(clockInfo);
  try {
    const response = await axios.post(
      `${urllocalhost}/clock-existzone`,
      clockInfo
    );
    console.log(response.data.exists); //true  si existe, false  no existe
    return response.data.exists;
  } catch (err) {
    console.log(err);
  }
};
