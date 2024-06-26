import axios from "axios";
import { urllocalhost } from "../urlrequest";
//solo se envia la info 

const iscompleted = async(user_id, title_id) =>
{
    const response = getAllArchivements(user_id);
    if(response[title_id].title_done)
    { //si es falso, no va a mandar a llamar a la funcion, si es cierto, entonces si va a poder darlo
        return false; 
    }else
    {
        return true
    }
}

export const grantArchivement = async(user_id, title_id) => 
{
    const archivement_info =
    {
        user_id: user_id,
        title_id: title_id
    }
    if(iscompleted(user_id))
    {
        try {
            const response = await axios.post(`${urllocalhost}/updateOne`, archivement_info );
            return (response.data);
        } catch (err) {
            console.log(err);
        }
    }
}



export const getAllArchivements = async(user_id) => 
{ 
    try { //mapear en torno a la info que se envie
        const response = await axios.post(`${urllocalhost}/title-getAll`, { user_id });
        // console.log("data "+response.data);
        // console.log(response.data);
        // console.log("titlename "+response.data.titles);
        // console.log(response.data.titles[0].title_name);
        // console.log("alltitles in response " + response.data.titles);
        return (response.data);
    } catch (err) {
        console.log(err);
    }
}
