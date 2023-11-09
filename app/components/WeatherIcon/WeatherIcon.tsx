import React from 'react'

import Sunny from "@/public/weather-icons/animated/day.svg";
import SlightlyCloudy from "@/public/weather-icons/animated/cloudy-day-1.svg";
import Cloudy from "@/public/weather-icons/animated/cloudy.svg";
import Drizzly from "@/public/weather-icons/animated/rainy-4.svg";
import Rainy from "@/public/weather-icons/animated/rainy-5.svg";
import ExtremelyRainy from "@/public/weather-icons/animated/rainy-6.svg";
import SlightlySnowy from "@/public/weather-icons/animated/snowy-4.svg";
import Snowy from "@/public/weather-icons/animated/snowy-5.svg";
import ExtremelySnowy from "@/public/weather-icons/animated/snowy-6.svg";
import Thunderbolt from "@/public/weather-icons/animated/snowy-6.svg";



type WeatherIconProps = {
    weatherCode: number;
}

const WeatherIcon = ({weatherCode}:WeatherIconProps) => {
  return (
    <div className='pr-5 flex justify-center items-center w-1/4 h-full'>
        {(weatherCode === 0 || weatherCode === 1) && <Sunny className="scale-200"/>}
        {weatherCode === 2 && <SlightlyCloudy className="scale-200"/>}
        {(weatherCode === 3 || weatherCode === 45 || weatherCode === 48)  && <Cloudy className="scale-200"/>}
        {(weatherCode === 51 || weatherCode === 53 || weatherCode === 55) && <Drizzly className="scale-200" />}
        {weatherCode === 61 && <Rainy className="scale-200" />}
        {(weatherCode === 63 || weatherCode === 65) && <ExtremelyRainy className="scale-200" />}
        {(weatherCode === 71 || weatherCode === 73) && <Snowy className="scale-200" />}
        {weatherCode === 75 && <ExtremelySnowy className="scale-200" />}
        {weatherCode === 77 && <SlightlySnowy className="scale-200" />}
        {(weatherCode === 80 || weatherCode === 81 || weatherCode === 82) && <ExtremelyRainy className="scale-200" />}
        {(weatherCode === 85 || weatherCode === 86) && <ExtremelySnowy className="scale-200" />}
        {(weatherCode === 95 || weatherCode === 96 || weatherCode === 99) && <Thunderbolt className="scale-200" />}
    </div>
  )
}

export default WeatherIcon