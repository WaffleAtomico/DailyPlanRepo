import axios from 'axios';



import { 
    ADD_TONE_URL,
    GET_TONES_URL,
    GET_TONE_BY_ID_URL,
    UPDATE_TONE_URL,
    DELETE_TONE_URL

} from '../routes';
import { base64ToBlob, splitBase64 } from '../sounds';


const getTones = async () => {
    try {
        const response = await axios.get(GET_TONES_URL);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const getToneById = async (toneId) => {
    try {
        const response = await axios.post( GET_TONE_BY_ID_URL, { tone_id: toneId });
        const { tone_name, tone_type, tone_location } = response.data;

        // Reassemble the base64 string from chunks
        
        const toneBlob = base64ToBlob(tone_location, tone_type);
        return {
            toneName: tone_name,
            toneBlob: toneBlob
        };
    } catch (error) {
        console.error('Error fetching tone chunks:', error);
        throw error;
    }
};

const addTone = async (formData) => {
    const base64Chunks = splitBase64(formData.alarmTone);
    const totalChunks = base64Chunks.length;
    const toneId = new Date().getTime(); // Temporary unique id for the tone

    const chunkPromises = base64Chunks.map((chunk, index) => {
        const chunkData = {
            tone_name: formData.alarmToneName,
            tone_location_chunk: chunk,
            tone_type: formData.alarmToneType,
            chunk_index: index,
            total_chunks: totalChunks,
            tone_id: toneId
        };

        return axios.post(ADD_TONE_URL, chunkData)
            .then(response => {
                console.log(`Chunk ${index + 1} of ${totalChunks} sent successfully:`, response.data);
                return response.data;
            })
            .catch(error => {
                console.error(`Error sending chunk ${index + 1} of ${totalChunks}:`, error);
                throw error;
            });
    });

    try {
        const responses = await Promise.all(chunkPromises);
        const finalResponse = responses.find(response => response.message && response.message.includes('Tone added successfully'));
        if (finalResponse) {
            console.log('All chunks sent successfully');
            return finalResponse;
        } else {
            throw new Error('Final response with tone_id not found');
        }
    } catch (error) {
        console.error('Error sending all chunks:', error);
        throw error;
    }
};


const updateTone = async (toneData) => {
    try {
        const response = await axios.post(UPDATE_TONE_URL, toneData);
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const deleteTone = async (toneId) => {
    try {
        const response = await axios.post(DELETE_TONE_URL, { toneId });
        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export { getTones, getToneById, addTone, updateTone, deleteTone };