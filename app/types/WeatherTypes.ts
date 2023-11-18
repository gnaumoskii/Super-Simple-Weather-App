export type Weather = {
    id: number,
    temperatureMin: number;
    temperatureMax: number;
    sunset: string;
    sunrise: string;
    date: Date;
    weatherCode: number;
    hourly: HourlyWeather[];
  }
  
  export type HourlyWeather = {
    id: number;
    temperature: number;
    weatherCode: number;
    time: string;
  }

  export type WeatherRawData = {
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    sunrise: string[];
    sunset: string[];
    time: string[];
    weather_code: number[];
  }

  export type WeatherHourlyRawData = {
    temperature_2m: number[];
    time: string[];
    weather_code: number[];
  }

