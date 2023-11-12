"use client";
import { fetchWeather } from "@/app/api/weather";
import { Position } from "@/app/types/LocationTypes";
import { secondsLeftUntilNextDay } from "@/app/util/TimeUtils";
import { getWeatherColor, mapWeatherCode } from "@/app/util/WeatherUtils";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./WeatherPageContent.scss";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import WeatherGroup from "../WeatherGroup/WeatherGroup";
import CloudImg from "../../../public/cloud.png";
import Image from 'next/image'
import { motion } from "framer-motion";
import ArrowDownIcon from "@/public/icons/arrow-down.svg"; 

const WeatherPageContent = () => {
    const weatherGroupRef = useRef<HTMLDivElement>(null);
    const fetchCooldown = secondsLeftUntilNextDay();
    const viewWeeklyWeather = () => {
        weatherGroupRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    const {
        data: weeklyWeather,
        isLoading,
        isFetched,
    } = useQuery({
        queryKey: ["fetchWeather"],
        queryFn: () => fetchWeather(),
        staleTime: fetchCooldown * 1000,
    });

    
    if(isLoading) {
        return (
            <LoadingSpinner />
        );
    }

    return (
        <div className="relative w-auto h-screen overflow-y-scroll overflow-hidden snap-y snap-mandatory">
            {/* <Image src={CloudImg} alt="Cloud" className="absolute top-[-230px] left-[-350px] "/>
            <Image src={CloudImg} alt="Cloud" className="absolute top-[-140px] right-[-300px] "/>
            <Image src={CloudImg} alt="Cloud" className="absolute top-[650px] left-[-295px]"/>
            <Image src={CloudImg} alt="Cloud" className="absolute top-[655px] right-[-220px] rotate-[-5deg]"/> */}
            <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden snap-center">

                <p className="text-center text-4xl font-black uppercase text-slate-200 mt-20 select-none">
                    <span className="weather-text">Todays&nbsp;</span>
                    <span className="weather-text">weather&nbsp;</span>
                    <span className="weather-text">is&nbsp;</span>
                    <br /> 
                    <span className={"weather-text mt-2 "+(weeklyWeather ? getWeatherColor(weeklyWeather[0].weatherCode) : "text-white")}>
                        {weeklyWeather && mapWeatherCode(weeklyWeather[0].weatherCode)}
                    </span>
                </p>
                {weeklyWeather && <WeatherCard className="weather-card mt-20" weather={weeklyWeather[0]}/>}
                <button className="border-white border-2 text-white p-3 mt-32 rounded-full" onClick={viewWeeklyWeather}><ArrowDownIcon className="pt-[2px] w-5 h-5"/></button>
            </div>
            <div ref={weatherGroupRef} className="mt-24 pt-14 w-full h-screen flex justify-center items-center snap-center">
                {weeklyWeather && <WeatherGroup weeklyWeather={weeklyWeather}/>}
            </div>
        </div>
    );
};

export default WeatherPageContent;
