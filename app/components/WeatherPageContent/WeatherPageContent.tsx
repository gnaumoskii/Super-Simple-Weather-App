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
        weatherGroupRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const {
        data: weeklyWeather,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["fetchWeather"],
        queryFn: () => fetchWeather(),
        staleTime: fetchCooldown * 1000,
    });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if(isError) {
        if('code' in error) {
            return (
                <motion.div className="h-[100dvh] flex justify-center items-center text-center text-lg lg:text-2xl font-black uppercase text-slate-200"
                initial={{ scale: 0.9, opacity: 0, y: -16 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ease: "backInOut", type: "spring" }}
                >
                    <p className="max-w-[600px] p-4">Please <span className="text-slate-400">allow location access</span> to receive accurate weather updates for your area.</p>
                </motion.div>
            )
        }

        return (
            <motion.div className="h-[100dvh] flex justify-center items-center text-center text-lg lg:text-2xl font-black uppercase text-slate-200"
            initial={{ scale: 0.9, opacity: 0, y: -16 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ease: "backInOut", type: "spring" }}
            >
                <p className="max-w-[600px] lg:max-w-[720px] p-4">Unknown error occured.<br/>Please <span className="text-slate-400">refresh the page</span> or <span className="text-slate-400">come back later.</span></p>
            </motion.div>
        )
    }

    return (
        <div className="relative w-auto h-screen overflow-y-scroll overflow-hidden lg:snap-y lg:snap-mandatory" data-test="weather-content">
            <div className="h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden snap-center">
                <div className="h-[50%] flex flex-col justify-end text-center text-[28px] md:text-4xl lg:text-5xl font-black uppercase text-slate-200">
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
                        is
                    </motion.span>
                    </p>
                    <motion.p
                        className={"m-[-8px] md:m-0 lg:mt-2 " + (weeklyWeather ? getWeatherColor(weeklyWeather[0].weatherCode) : "text-white")}
                        data-test="weather-text"
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
                        <WeatherCard className="m-12 lg:mt-16" weather={weeklyWeather[0]} />
                    </motion.div>
                )}
                <motion.div
                    className="mt-auto mb-28"
                    initial={{ scale: 0.8, opacity: 0, y: 16 }}
                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, ease: "backInOut", type: "spring" }}
                    viewport={{once: true}}
                >
                    <motion.button
                        data-test="weekly-weather-button"
                        onClick={viewWeeklyWeather}
                        className="text-slate-200 p-3 text-lg font-bold flex flex-col justify-center items-center uppercase relative top-12"
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
            <div ref={weatherGroupRef} className="mt-24 pt-14 w-full h-[100dvh] flex justify-center items-center snap-start">
                {weeklyWeather && <WeatherGroup weeklyWeather={weeklyWeather} />}
            </div>
        </div>
    );
};

export default WeatherPageContent;
