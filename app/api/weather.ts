import { Weather, WeatherHourlyRawData, WeatherRawData } from "../types/WeatherTypes";
import { getUserLocation } from "../util/LocationUtils";
import { convertWeatherData } from "../util/WeatherUtils";

export const fetchWeather = async (): Promise<Weather[]> => {
    try {
      const location = await getUserLocation();
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`);
      const data = await response.json();
      const weeklyWeatherData: WeatherRawData = data.daily;
      const hourlyWeatherData: WeatherHourlyRawData = data.hourly;
      return convertWeatherData(weeklyWeatherData, hourlyWeatherData);

    } catch (error: any) {
      if('code' in error && 'message' in error) {
        throw {message: error.message, code: error.code};
      }
      throw new Error('Error fetching data: ' + error);
    }
}