import axios from "axios";

//solo se envia la info 
export const updateArchivement = async(user_id, title_id) => 
{
    const archivement_info =
    {
        user_id: user_id,
        title_id: title_id
    }
    try {
        // console.log("userid from clock.js (front): "+ user_id);
        const response = await axios.post("http://localhost:3001/updateOne", archivement_info );
        return (response.data);
    } catch (err) {
        console.log(err);
    }
}

export const getAllArchivements = async(user_id) => 
{ 
    try { //mapear en torno a la info que se envie
        const response = await axios.post("http://localhost:3001/title-getAll", { user_id });
        return (response.data.title);
    } catch (err) {
        console.log(err);
    }
}

export {
    updateArchivement,
    getAllArchivements
}