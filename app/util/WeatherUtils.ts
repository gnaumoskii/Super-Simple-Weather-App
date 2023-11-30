import { HourlyWeather, Weather, WeatherHourlyRawData, WeatherRawData } from "../types/WeatherTypes";

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


export const mapWeatherCode = (code: number, isNight?: boolean): string => {
    return weatherCodeMapper[code];
}

export const getWeatherColor = (weatherCode: number) => {
  const weatherCodeDescription = mapWeatherCode(weatherCode);
  if(weatherCodeDescription.toLowerCase() === "sunny") {
    return "text-yellow-500"
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
    return "text-gray-400"
  } else
  if(weatherCodeDescription.toLowerCase() === "snowy" || weatherCodeDescription.toLowerCase() === "very snowy" || weatherCodeDescription.toLowerCase() === "slightly snowy") {
    return "text-sky-300"
  } else
  if(weatherCodeDescription.toLowerCase() === "extremely snowy") {
    return "text-slate-300"
  } else
  if(weatherCodeDescription.toLowerCase() === "drizzly") {
    return "text-slate-300"
  } else
  if(weatherCodeDescription.toLowerCase() === "foggy" || weatherCodeDescription.toLowerCase() === "slightly foggy") {
    return "text-gray-300"
  } else
  if(weatherCodeDescription.toLowerCase() === "thunderstorm" || weatherCodeDescription.toLowerCase() === "thunderstorm with hail" || weatherCodeDescription.toLowerCase() === "thunderstorm with heavy hail") {
    return "text-red-700"
  }
  return "text-white";
}

export const convertWeatherData = (weatherData: WeatherRawData, hourlyData: WeatherHourlyRawData) => {
    const weeklyWeather: Weather[] = [];
    const hourlyDataArr = hourlyData;
    let hourlyStartOffset = 0;
    let hourlyEndOffset = 24;

    for(let i=0;i < 7; i++) {
      const weatherObj: Weather = {
        id: i,
        temperatureMax: weatherData.temperature_2m_max[i],
        temperatureMin: weatherData.temperature_2m_min[i],
        sunrise: weatherData.sunrise[i],
        sunset: weatherData.sunset[i],
        date: new Date(weatherData.time[i]),
        weatherCode: weatherData.weather_code[i],
        hourly: []
      };

      const hourlyTemperature = hourlyData.temperature_2m.slice(hourlyStartOffset, hourlyEndOffset);
      const hourlyWeatherCode = hourlyData.weather_code.slice(hourlyStartOffset, hourlyEndOffset);
      const hourlyTime = hourlyData.time.slice(hourlyStartOffset, hourlyEndOffset);

      for(let i=0;i<24;i++) {
        weatherObj.hourly.push({id: i, temperature: hourlyTemperature[i], weatherCode: hourlyWeatherCode[i], time: hourlyTime[i]});
      }

      weatherObj.weatherCode = getClosestWeatherCode(weatherObj.hourly);

      weeklyWeather.push(weatherObj);
      hourlyStartOffset+=24;
      hourlyEndOffset+=24;
    }
    return weeklyWeather;
}

export const getClosestWeatherCode = (hourlyWeather: HourlyWeather[]) => {
  const weatherCodes = [0,1,2,3,45,48,51,53,55,61,63,65,71,73,75,77,80,81,82,85,86,95,96,99];
  const averageWeatherCode = hourlyWeather.reduce((sum, value) => sum + value.weatherCode, 0) / hourlyWeather.length
  const closestWeatherCode = weatherCodes.reduce((a,b) => Math.abs(b-averageWeatherCode) < Math.abs(a-averageWeatherCode) ? b : a)
  return closestWeatherCode;
}