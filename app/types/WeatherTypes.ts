export type Weather = {
    temperatureMin: number;
    temperatureMax: number;
    sunset: string;
    sunrise: string;
    date: Date;
    weatherCode: number;
  
  }
  
  export type WeatherRawData = {
    temperature_2m_min: number[];
    temperature_2m_max: number[];
    sunrise: string[];
    sunset: string[];
    time: string[];
    weather_code: number[];
  }