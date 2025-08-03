import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * API handler to fetch weather data from Open-Meteo based on latitude and longitude.
 * 
 * Query parameters:
 * - lat: latitude (required)
 * - lon: longitude (required)
 * 
 * Responds with weather data or error message.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lat, lon } = req.query;

  // Validate presence of latitude and longitude in query parameters
  if (!lat || !lon) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    // Call Open-Meteo API with current weather and daily max/min temps
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
      `&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
    );

    // If response status is not OK, forward the status and error
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch weather data' });
    }

    // Parse JSON response from API
    const data = await response.json();

    // Return data with 200 status
    res.status(200).json(data);
  } catch (error) {
    // Handle network or unexpected errors
    console.error("Weather API error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
