import { HourlyWeather, Weather } from "@/app/types/WeatherTypes";
import { getWeatherColor, mapWeatherCode } from "@/app/util/WeatherUtils";
import React from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { motion } from "framer-motion";

type WeatherDetailsProps = {
    weather: Weather;
};

type WeatherHourCardProps = {
    hourlyWeather: HourlyWeather;
};

const WeatherHourCard: React.FC<WeatherHourCardProps> = ({ hourlyWeather }) => {
    const hours = new Date(hourlyWeather.time).getHours();
    const isNightTime = !(hours > 6 && hours < 20);
    let weatherName = mapWeatherCode(hourlyWeather.weatherCode);
    if (weatherName.toLowerCase() == "sunny" && isNightTime) {
        weatherName = "Clear Sky";
    }
    return (
        <motion.li data-test="weather-hourly-card" className="flex justify-start items-center bg-slate-800 m-4 rounded-2xl p-1"
          initial={{x: -30, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{type:"spring", ease:"backInOut", delay: 0.05 * hourlyWeather.id}}
        >
            <WeatherIcon className="scale-100 h-full w-[60px]" weatherCode={hourlyWeather.weatherCode} isNight={isNightTime} />
            <div className="flex items-center mt-1 border-l-[1px] border-white w-full">
                <div className="w-1/2 flex flex-col min-[475px]:flex-row">
                    <p className="w-[100%] sm:w-[50%] pl-3 text-lg font-bold break-words" data-test="weather-hourly-card__time">
                        {new Date(hourlyWeather.time).toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className="ml-4 text-lg font-bold break-words" data-test="weather-hourly-card__temperature">
                        {hourlyWeather.temperature.toFixed(1)}
                        <span className="font-sans">&#8451;</span>
                    </p>
                </div>
                <p
                    data-test="weather-hourly-card__weather-name"
                    className={`pr-4 w-1/2 font-bold text-center ${weatherName.length >= 16 ? "text-md" : "text-lg"} ${getWeatherColor(
                        hourlyWeather.weatherCode
                    )}`}
                >
                    {weatherName}
                </p>
            </div>
        </motion.li>
    );
};

const WeatherDetails = ({ weather }: WeatherDetailsProps) => {
    return (
        <div className="w-full h-full max-w-[560px] sm:h-fit" data-test="weather-details">
            <h1 className="mt-12 sm:mt-6 text-center text-white capitalize text-3xl font-semibold">Weather details</h1>
            <div className="mt-12"
            >
                <p className="uppercase font-light text-lg text-slate-400">DATE</p>
                <motion.p className="font-bold text-xl text-white"
                  initial={{x: -13, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  transition={{type:"spring", ease:"backInOut", delay: 0.05}}
                  data-test="weather-details__date"
                >
                    {weather.date.toLocaleDateString("default", { weekday: "long" })} -{" "}
                    {weather.date.toLocaleDateString("default", { month: "long", day: "numeric", year: "numeric" })}
                </motion.p>
            </div>
            <div className="mt-6">
                <p className="uppercase font-light text-lg text-slate-400">TEMPERATURES (MAX / MIN)</p>
                <motion.p className="font-bold text-xl text-white"
                  initial={{x: -13, opacity: 0}}
                  animate={{x: 0, opacity: 1}}
                  transition={{type:"spring", ease:"backInOut", delay: 0.05}}
                  data-test="weather-details__temperatures"
                >
                    {weather.temperatureMax.toFixed(1)}
                    <span className="font-sans">&#8451;</span> / {weather.temperatureMin.toFixed(1)}
                    <span className="font-sans">&#8451;</span>
                </motion.p>
            </div>
            <div className="flex mt-6">
                <div className="">
                    <p className="uppercase font-light text-lg text-slate-400">SUNRISE</p>
                    <motion.p className="font-bold text-xl text-white"
                      initial={{x: -13, opacity: 0}}
                      animate={{x: 0, opacity: 1}}
                      transition={{type:"spring", ease:"backInOut", delay: 0.05}}
                      data-test="weather-details__sunrise"
                    >
                        {new Date(weather.sunrise).toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" })}
                    </motion.p>
                </div>
                <div className="ml-12">
                    <p className="uppercase font-light text-lg text-slate-400">SUNSET</p>
                    <motion.p className="font-bold text-xl text-white"
                      initial={{x: -13, opacity: 0}}
                      animate={{x: 0, opacity: 1}}
                      transition={{type:"spring", ease:"backInOut", delay: 0.05}}
                      data-test="weather-details__sunset"
                    >
                        {new Date(weather.sunset).toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" })}
                    </motion.p>
                </div>
            </div>
            <div className="mt-6">
                <p className="uppercase font-light text-lg text-slate-400">HOURLY WEATHER</p>
                <motion.ul className="mt-2 h-[50%] sm:max-h-[352px] overflow-y-auto text-white bg-slate-900 bg-opacity-70 rounded-l-2xl"
                  transition={{delay: 0.5}}
                >
                    {weather.hourly.map((hourlyWeather) => (
                        <WeatherHourCard key={hourlyWeather.id} hourlyWeather={hourlyWeather} />
                    ))}
                </motion.ul>
            </div>
        </div>
    );
};

export default WeatherDetails;
