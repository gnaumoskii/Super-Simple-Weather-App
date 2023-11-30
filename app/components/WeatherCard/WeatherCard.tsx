import { Weather } from "@/app/types/WeatherTypes";
import React, { useState } from "react";
import WeatherIcon from "../WeatherIcon/WeatherIcon";
import { getWeatherColor, mapWeatherCode } from "@/app/util/WeatherUtils";
import WeatherDetails from "../WeatherDetails/WeatherDetails";
import Modal from "../Modal/Modal";
import { motion, useAnimate } from "framer-motion";

type WeatherCardProps = {
    weather: Weather;
    className?: string;
};

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, className }) => {
    const [modalIsOpened, setModalIsOpened] = useState(false);
    const [scope, animate] = useAnimate();
    const toggleModal = () => {
        setModalIsOpened(prev => !prev);
    }
    return (
        <>
        <motion.div 
            className={"relative bg-[#161f33] p-4 w-[360px] md:w-400 rounded-3xl flex items-center text-white shadow-lg shadow-[rgba(0,0,0,0.25)] cursor-pointer z-[1]" + " " + className}
            data-test="weather-card"
            onClick={toggleModal}
            initial={{scale: 1}}
            whileHover={{scale: [1.1, 1]}}
            transition={{type: "spring", ease:"backInOut"}}
        >
            <WeatherIcon className="scale-[150%] mr-2" weatherCode={weather.weatherCode} />
            <div className="border-l-[1px] border-white flex justify-between items-center w-full">
                <div className="flex flex-col justify-center w-full pl-3">
                    <p className="w-14 min-[475px]:w-16 md:w-auto font-light uppercase font-montsrrat text-xs sm:text-sm tracking-widest">
                    {weather.date.toLocaleDateString("default", {weekday: "short"})} <span className="hidden md:inline">|</span> {weather.date.toLocaleDateString("default", { month: "short", day: "numeric" }).toUpperCase()} 
                    </p>
                    <p className="font-bold text-md sm:text-lg">
                        {weather.temperatureMax.toFixed(1)}<span className="font-sans">&#8451;</span> / {weather.temperatureMin.toFixed(1)}<span className="font-sans">&#8451;</span>
                    </p>
                </div>
                <div className="w-full">
                     <p className="font-light uppercase font-montsrrat text-xs tracking-widest text-center">Weather</p>
                     <p className={"text-xs sm:text-sm font-bold sm:font-extrabold uppercase text-center " + getWeatherColor(weather.weatherCode)}>{mapWeatherCode(weather.weatherCode)}</p>
                </div>
                
            </div>
            <motion.div 
                ref={scope}
                className="absolute w-full h-full top-0 left-0 rounded-3xl border-[2px] border-slate-700 "
                initial={{opacity: 0, scaleX: 1, scaleY: 1}}
                onHoverStart={() => animate(scope.current, {opacity: [ 0,1, 0, 0],  scaleX: [1,1.05, 1.15, 1] ,scaleY:[1,1.1, 1.3, 1]}, {delay: 0.05})}
            >
            </motion.div>
        </motion.div>
        {modalIsOpened && <Modal ModalContent={<WeatherDetails weather={weather}/>}  closeModal={toggleModal} /> }
        </>
    );
};

export default WeatherCard;
