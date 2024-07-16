import axios from "axios";
import { GET_ALL_TITLES, UPDATE_ONE_TITLE } from "../routes";

//solo se envia la info

export const isCompleted = async (user_id, title_id) => {
  try {
    const response = await axios.post(GET_ALL_TITLES, { user_id });
    // console.log(response.data[title_id]);
    const titleInfo = response.data[title_id];
    if (titleInfo.title_done == 0) {
      // console.log("El título no está completado");
      return false;
    } else {
      // console.log("El título está completado");
      return true;
    }
  } catch (err) {
    console.log("Error en isCompleted:", err);
    throw err;
  }
};

export const grantArchivement = async (user_id, title_id) => {
  // const archivement_info = {
  //   user_id: user_id,
  //   title_id: title_id,
  // };
  try {
    const response = await axios.post(UPDATE_ONE_TITLE, {user_id, title_id});
    console.log(response);
    return response
    // return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAllArchivements = async (user_id) => {
  // console.log("si entre a getAllArchivements");
  try {
    //mapear en torno a la info que se envie
    const response = await axios.post(GET_ALL_TITLES, { user_id });
    // console.log("data "+response.data);
    console.log(response.data);
    // console.log("titlename "+response.data.titles);
    // console.log(response.data.titles[0].title_name);
    console.log("alltitles in response " + response.data[0].titles);

    // return response.data;
    return response;
  } catch (err) {
    console.log(err);
  }
};
