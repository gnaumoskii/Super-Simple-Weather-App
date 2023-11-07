'use client';
import { fetchWeather } from '@/app/api/weather';
import { Position } from '@/app/types/LocationTypes';
import { secondsLeftUntilNextDay } from '@/app/util/TimeUtils';
import { mapWeatherCode } from '@/app/util/WeatherUtils';
import { useQuery } from '@tanstack/react-query';
import React from 'react'


const WeatherPageContent = () => {
  const fetchCooldown = secondsLeftUntilNextDay();
  const {data: weeklyWeather, isLoading, isFetched, isError, fetchStatus} = useQuery({
    queryKey: ["fetchWeather"],
    queryFn: () => fetchWeather(),
    staleTime: fetchCooldown * 1000,
  });
  

  return (
    <div>
        {isLoading && <p>Loading...</p>}
        {weeklyWeather && isFetched && !isLoading && weeklyWeather.length > 0 && <ul>
            {weeklyWeather.map(dailyWeather => <li key={dailyWeather.temperatureMax}>{JSON.stringify(dailyWeather)}<p>{mapWeatherCode(dailyWeather.weatherCode)}</p></li>)}
          </ul>}
    </div>
  )
}

export default WeatherPageContent