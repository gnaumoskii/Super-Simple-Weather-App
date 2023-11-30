import { Weather } from "@/app/types/WeatherTypes";
import React, { useRef } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import { motion, useInView } from "framer-motion";

type WeatherGroupProps = {
    weeklyWeather: Weather[];
};

const fadeAnimationVariants = {
    hiddenLeft: { opacity: 0, x: 264, scale: 0.8 },
    hiddenRight: { opacity: 0, x: -264, scale: 0.8 },
    fadeToCenter: { opacity: 1, x: 0, scale: 1 },

};

const WeatherGroup: React.FC<WeatherGroupProps> = ({ weeklyWeather }) => {
    const weatherCardRef = useRef(null);
    const inView = useInView(weatherCardRef, { once: true });
    return (
        <div className="relative" data-test="weather-group">
            <motion.p className="text-center text-white uppercase text-2xl font-black"
            initial={{opacity: 0, scale: 0}}
            whileInView={{opacity: 1, scale: 1}}
            transition={{delay: 0 ,type:"spring", ease:"backInOut" }}
            viewport={{once: true}}
            >
              Weekly Weather
            </motion.p>
            <div className="mt-10">
                <motion.div
                    className="w-[2px] bg-slate-500 h-[calc(100%-102px)] absolute top-10 left-[50%] origin-top hidden lg:block"
                    initial={{ scaleY: 0 }}
                    animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                    transition={{ type: "spring", delay: 1 }}
                >
                </motion.div>
                <motion.div
                        className="bg-slate-500 h-[2px] w-[160px] absolute top-[38px] left-[50%]"
                        initial={{translateX: '-50%', scale: 0}}
                        animate={inView ? { scale: 1, translateX: '-50%' } : { scale: 0 }}
                        transition={{ ease: "backInOut", type:"spring", delay: 0}}
                ></motion.div>
                <ul className="w-[856px] flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-start lg:items-end">
                    {weeklyWeather.map((dailyWeather, index) => {
                        let isEven = index % 2 == 0;
                        return (
                            <motion.li
                                className={"relative mx-[14px] origin-right mb-4 " + (isEven && index !== 6 ? "lg:mb-[104px]" : "")}
                                key={dailyWeather.id}
                                ref={weatherCardRef}
                                variants={fadeAnimationVariants}
                                initial={isEven ? "hiddenLeft" : "hiddenRight"}
                                whileInView={"fadeToCenter"}
                                transition={{ delay: 0.05 * index, ease: "backInOut", type: "spring" }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className={" bg-slate-500 h-[2px] w-[14px] absolute top-[50%] translate-y-[50%] hidden lg:block " + (isEven ? "right-[-14px] origin-left" : "left-[-14px] origin-right")}
                                    initial={{scale: 0}}
                                    animate={inView ? { scale: 1 } : { scale: 0 }}
                                    transition={{ ease: "backInOut", delay: 1.5, type: "spring" }}
                                >
                                </motion.div>
                                <WeatherCard className={`relative`} weather={dailyWeather} />
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default WeatherGroup;
