"use client";
import { fetchWeather } from "@/app/api/weather";
import { secondsLeftUntilNextDay } from "@/app/util/TimeUtils";
import { getWeatherColor, mapWeatherCode } from "@/app/util/WeatherUtils";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import WeatherGroup from "../WeatherGroup/WeatherGroup";
import { motion, useAnimate } from "framer-motion";
import ArrowDownIcon from "@/public/icons/arrow-down.svg";

const WeatherPageContent = () => {
    const weatherGroupRef = useRef<HTMLDivElement>(null);
    const fetchCooldown = secondsLeftUntilNextDay();
    const [scope, animate] = useAnimate();
    const viewWeeklyWeather = () => {
        weatherGroupRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    const {
        data: weeklyWeather,
        isLoading,
    } = useQuery({
        queryKey: ["fetchWeather"],
        queryFn: () => fetchWeather(),
        staleTime: fetchCooldown * 1000,
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="relative w-auto h-screen overflow-y-scroll overflow-hidden snap-y snap-mandatory" data-test="weather-content">
            <div className="h-screen w-full flex flex-col items-center justify-center overflow-hidden snap-center">
                <div className="text-center text-5xl font-black uppercase text-slate-200 mt-60">
                    <p>
                    <motion.span
                        className="inline-block"
                        initial={{ scale: 0.7, opacity: 0, y: -48 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, ease: "easeOut", type: "spring" }}
                        viewport={{ once: true }}
                    >
                        Todays&nbsp;
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        initial={{ scale: 0.7, opacity: 0, y: -48 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, ease: "easeOut", type: "spring" }}
                        viewport={{ once: true }}
                    >
                        weather&nbsp;
                    </motion.span>
                    <motion.span
                        className="inline-block"
                        initial={{ scale: 0.7, opacity: 0, y: -48 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 0.65, ease: "easeOut", type: "spring" }}
                        viewport={{ once: true }}
                    >
                        is&nbsp;
                    </motion.span>
                    </p>
                    <motion.p
                        data-test="weather-text"
                        className={"mt-2 " + (weeklyWeather ? getWeatherColor(weeklyWeather[0].weatherCode) : "text-white")}
                        initial={{ scale: 0.9, opacity: 0, y: 48 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, ease: "backInOut", type: "spring" }}
                        viewport={{ once: true }}
                    >
                        {weeklyWeather && mapWeatherCode(weeklyWeather[0].weatherCode)}
                    </motion.p>
                </div>
                {weeklyWeather && (
                    <motion.div
                        data-test="landing-weather-card"
                        initial={{ scale: 1, opacity: 0, y: 32 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, ease: "backInOut", type: "spring" }}
                        viewport={{ once: true }}
                    >
                        <WeatherCard className="mt-20" weather={weeklyWeather[0]} />
                    </motion.div>
                )}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 16 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, ease: "backInOut", type: "spring" }}
                    viewport={{once: true}}
                >
                    <motion.button
                        data-test="weekly-weather-button"
                        onClick={viewWeeklyWeather}
                        className="text-slate-200 p-3 mt-32 text-lg font-bold flex flex-col justify-center items-center uppercase relative top-12"
                        initial={{opacity: 0.5}}
                        whileHover={{ scale: 1.15, opacity: 1 }}
                        transition={{ ease: "backInOut", type: "spring" }}
                        onHoverStart={() => {animate("span",{ scale: 1, opacity: 1, y: 0}, {type:"spring"})}}
                        onHoverEnd={() => {animate("span",{ scale: 0.5,opacity: 0, y: 18}, {type:"spring"})}}
                        ref={scope}
                    >
                        <span className="opacity-0 scale-50">Weekly Weather</span>
                        <ArrowDownIcon className="w-[36px] h-[36px]"></ArrowDownIcon>
                        
                    </motion.button>
                </motion.div>
            </div>
            <div ref={weatherGroupRef} className="mt-24 pt-14 w-full h-screen flex justify-center items-center snap-center">
                {weeklyWeather && <WeatherGroup weeklyWeather={weeklyWeather} />}
            </div>
        </div>
    );
};

export default WeatherPageContent;
