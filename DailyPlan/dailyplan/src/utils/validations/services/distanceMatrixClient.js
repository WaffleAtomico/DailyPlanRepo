import axios from 'axios';

import { DISTANCE_MATRIX_URL } from '../../routes';


export const getDistanceTimeMatrix = async (origins, destinations, mode='driving') => {
  try {
    const response = await axios.post(DISTANCE_MATRIX_URL, { origins, destinations, mode });

    const data = response.data;
    console.log("La solicitud dio como resultado:", data);

    if (data.rows && data.rows.length > 0 && data.rows[0].elements && data.rows[0].elements.length > 0) {
      const element = data.rows[0].elements[0];
      return {
        distance: element.distance,
        duration: element.duration,
      };
    } else {
      throw new Error('No results found');
    }
  } catch (error) {
    console.error('Error fetching distance matrix:', error);
    throw error;
  }
};
