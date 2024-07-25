import axios from 'axios';

import { DISTANCE_MATRIX_URL } from '../../routes';


export const getDistanceMatrix = async (origins, destinations) => {
  try {
    const response = await axios.post(DISTANCE_MATRIX_URL, { origins, destinations });
    return response.data;
  } catch (err) {
    console.error('Error fetching distance matrix:', err);
  }
};
