import { Weather, WeatherRawData } from "../types/WeatherTypes";

type WeatherCodeMap = {
    [key: number]: string
}

const weatherCodeMapper: WeatherCodeMap = {
    0: "Sunny",
    1: "Sunny",
    2: "Slightly Cloudy",
    3: "Cloudy",
    45: "Slightly Foggy",
    48: "Foggy",
    51: "Drizzly",
    53: "Drizzly",
    55: "Drizzly",
    61: "Rainy",
    63: "Very Rainy",
    65: "Very Rainy",
    71: "Snowy",
    73: "Snowy",
    75: "Very Snowy",
    77: "Slightly Snowy",
    80: "Extremely Rainy",
    81: "Extremely Rainy",
    82: "Extremely Rainy",
    85: "Extremely Snowy",
    86: "Extremely Snowy",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Thunderstorm with heavy hail",
}


export const mapWeatherCode = (code: number): string => {
    return weatherCodeMapper[code];
}

export const getWeatherColor = (weatherCode: number) => {
  const weatherCodeDescription = mapWeatherCode(weatherCode);
  if(weatherCodeDescription.toLowerCase() === "sunny") {
    return "text-yellow-400"
  } else
  if(weatherCodeDescription.toLowerCase() === "rainy") {
    return "text-slate-500"
  } else
  if(weatherCodeDescription.toLowerCase() === "very rainy") {
    return "text-slate-600"
  } else
  if(weatherCodeDescription.toLowerCase() === "extremely rainy") {
    return "text-slate-700"
  } else
  if(weatherCodeDescription.toLowerCase() === "cloudy" || weatherCodeDescription.toLowerCase() === "slightly cloudy") {
    return "text-gray-300"
  } else
  if(weatherCodeDescription.toLowerCase() === "snowy" || weatherCodeDescription.toLowerCase() === "very snowy" || weatherCodeDescription.toLowerCase() === "slightly snowy") {
    return "text-slate-200"
  } else
  if(weatherCodeDescription.toLowerCase() === "extremely snowy") {
    return "text-slate-300"
  } else
  if(weatherCodeDescription.toLowerCase() === "drizzly") {
    return "text-slate-300"
  } else
  if(weatherCodeDescription.toLowerCase() === "foggy" || weatherCodeDescription.toLowerCase() === "slightly foggy") {
    return "text-gray-200"
  } else
  if(weatherCodeDescription.toLowerCase() === "thunderstorm" || weatherCodeDescription.toLowerCase() === "thunderstorm with hail" || weatherCodeDescription.toLowerCase() === "thunderstorm with heavy hail") {
    return "text-red-800"
  }
  return "text-white";
}

export const convertWeatherData = (weatherData: WeatherRawData) => {
    const weeklyWeather: Weather[] = [];
    for(let i=0;i < 7; i++) {
      const weatherObj: Weather = {
        id: i,
        temperatureMax: weatherData.temperature_2m_max[i],
        temperatureMin: weatherData.temperature_2m_min[i],
        sunrise: weatherData.sunrise[i],
        sunset: weatherData.sunset[i],
        date: new Date(weatherData.time[i]),
        weatherCode: weatherData.weather_code[i]
      };
      weeklyWeather.push(weatherObj);
    }
    return weeklyWeather;
}