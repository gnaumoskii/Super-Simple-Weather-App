import React from 'react'

import Sunny from "@/public/weather-icons/animated/day.svg";
import ClearNight from "@/public/weather-icons/animated/night.svg";
import SlightlyCloudy from "@/public/weather-icons/animated/cloudy-day-1.svg";
import SlightlyCloudyNight from "@/public/weather-icons/animated/cloudy-night-1.svg";
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
    className?: string;
    isNight?: boolean;
}

const WeatherIcon = ({weatherCode, className, isNight=false}:WeatherIconProps) => {
  return (
    <div className=''>
        {(weatherCode === 0 || weatherCode === 1) && (!isNight ? <Sunny className={className}/> : <ClearNight className={className}/>)}
        {weatherCode === 2 && (!isNight ? <SlightlyCloudy className={className}/> : <SlightlyCloudyNight className={className}/>)}
        {(weatherCode === 3 || weatherCode === 45 || weatherCode === 48)  && <Cloudy className={className}/>}
        {(weatherCode === 51 || weatherCode === 53 || weatherCode === 55) && <Drizzly className={className} />}
        {weatherCode === 61 && <Rainy className={className} />}
        {(weatherCode === 63 || weatherCode === 65) && <ExtremelyRainy className={className} />}
        {(weatherCode === 71 || weatherCode === 73) && <Snowy className={className} />}
        {weatherCode === 75 && <ExtremelySnowy className={className} />}
        {weatherCode === 77 && <SlightlySnowy className={className} />}
        {(weatherCode === 80 || weatherCode === 81 || weatherCode === 82) && <ExtremelyRainy className={className} />}
        {(weatherCode === 85 || weatherCode === 86) && <ExtremelySnowy className={className} />}
        {(weatherCode === 95 || weatherCode === 96 || weatherCode === 99) && <Thunderbolt className={className} />}
    </div>
  )
}

export default WeatherIcon