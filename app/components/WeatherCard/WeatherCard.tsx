import { Weather } from "@/app/types/WeatherTypes";
import React from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { getWeatherColor, mapWeatherCode } from "@/app/util/WeatherUtils";

type WeatherCardProps = {
    weather: Weather;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
    return (
        <div className="bg-slate-700 bg-opacity-20 border-2 border-transparent p-4 m-4 w-400 rounded-3xl flex items-center cursor-pointer text-white">
            <WeatherIcon weatherCode={weather.weatherCode} />
            <div className="border-l-2 border-white flex justify-between items-center w-full">
                <div className="flex flex-col justify-center w-full pl-3">
                    <p className="font-light uppercase font-montsrrat text-sm tracking-widest">
                    {weather.date.toLocaleDateString("default", {weekday: "short"})} | {weather.date.toLocaleDateString("default", { month: "short", day: "numeric" }).toUpperCase()} 
                    </p>
                    <p className="font-bold text-lg">
                        {weather.temperatureMax.toFixed(1)}<span className="font-sans">&#8451;</span> / {weather.temperatureMin.toFixed(1)}<span className="font-sans">&#8451;</span>
                    </p>
                </div>
                <div className="w-full">
                     <p className="font-light uppercase font-montsrrat text-xs tracking-widest text-center">Weather</p>
                     <p className={"text-sm font-extrabold uppercase text-center " + getWeatherColor(weather.weatherCode)}>{mapWeatherCode(weather.weatherCode)}</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
