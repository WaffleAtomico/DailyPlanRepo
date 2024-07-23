// pages/api/openStreetMap.js
import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_OPENSTREETMAP_API_URL}/search`, {
      params: {
        q: query,
        format: 'json',
      },
    });
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching OpenStreetMap data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
