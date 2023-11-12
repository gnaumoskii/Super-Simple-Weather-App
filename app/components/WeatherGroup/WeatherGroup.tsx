import { Weather } from "@/app/types/WeatherTypes";
import React, { useRef } from "react";
import WeatherCard from "../WeatherCard/WeatherCard";
import "./WeatherGroup.scss";
import { motion, useAnimate, useInView, MotionConfig } from "framer-motion";

type WeatherGroupProps = {
    weeklyWeather: Weather[];
};

const fadeAnimationVariants = {
    hidden: { opacity: 0, x: 0, scale: 0.8 },
    fadeToLeft: { opacity: 1, x: -215, scale: 1 },
    fadeToRight: { opacity: 1, x: 215, scale: 1 },
};

const WeatherGroup = ({ weeklyWeather }: WeatherGroupProps) => {
    const weatherCardRef = useRef(null);
    const [scope, animate] = useAnimate();
    const inView = useInView(weatherCardRef, { once: true });
    return (
        <div className="relative">
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
                    className="mt-10 w-[2px] bg-slate-500 h-[calc(100%-4%)] absolute top-[0%] left-[50%]  origin-top"
                    initial={{ height: 0 }}
                    animate={inView ? { height: 754 } : { height: 0 }}
                    transition={{ ease: "backInOut", duration: 1, delay: 0.5 }}
                >
                    <motion.div
                        className="mt-[-2px] bg-slate-500 h-[2px] w-[160px] !absolute top-0 left-[50%]"
                        initial={{translateX: '-50%'}}
                        animate={inView ? { scale: 1, translateX: '-50%' } : { scale: 0 }}
                        transition={{ ease: "backInOut", duration: 1, delay: 0}}
                    ></motion.div>
                    <MotionConfig
                      transition={{ ease: "backInOut", delay: 1.5, type: "spring" }}
                    >
                        <motion.div
                            className="mt-5 bg-slate-500 h-[2px] w-[14px] absolute left-[-14px] top-[60px] origin-right"
                            animate={inView ? { scale: 1 } : { scale: 0 }}
                            
                        ></motion.div>
                        <motion.div
                            className="mt-5 bg-slate-500 h-[2px] w-[14px] absolute left-[2px] top-[176px] origin-left"
                            animate={inView ? { scale: 1 } : { scale: 0 }}
                        ></motion.div>
                        <motion.div
                            className="mt-5 bg-slate-500 h-[2px] w-[14px] absolute left-[-14px] top-[284px] origin-right"
                            animate={inView ? { scale: 1 } : { scale: 0 }}
                        ></motion.div>
                        <motion.div
                            className="mt-5 bg-slate-500 h-[2px] w-[14px] absolute left-[2px] top-[400px] origin-left"
                            animate={inView ? { scale: 1 } : { scale: 0 }}
                        ></motion.div>
                        <motion.div
                            className="mt-5 bg-slate-500 h-[2px] w-[14px] absolute left-[-14px] top-[508px] origin-right"
                            animate={inView ? { scale: 1 } : { scale: 0 }}
                        ></motion.div>
                        <motion.div
                            className="mt-5 bg-slate-500 h-[2px] w-[14px] absolute left-[2px] top-[624px] origin-left"
                            animate={inView ? { scale: 1 } : { scale: 0 }}
                        ></motion.div>
                        <motion.div
                            className="mt-5 bg-slate-500 h-[2px] w-[14px] absolute left-[-14px] top-[732px] origin-right"
                            animate={inView ? { scale: 1 } : { scale: 0 }}
                        ></motion.div>
                    </MotionConfig>
                </motion.div>

                <ul className="">
                    {weeklyWeather.map((dailyWeather, index) => {
                        let isEven = index % 2 == 0;
                        return (
                            <motion.li
                                key={dailyWeather.id}
                                ref={weatherCardRef}
                                variants={fadeAnimationVariants}
                                initial={"hidden"}
                                whileInView={isEven ? "fadeToLeft" : "fadeToRight"}
                                transition={{ delay: 0.05 * index, ease: "backInOut", type: "spring" }}
                                viewport={{ once: true }}
                            >
                                <WeatherCard className="relative" weather={dailyWeather} />
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default WeatherGroup;
