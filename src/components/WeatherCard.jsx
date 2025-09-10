import React, { useRef, useState } from 'react'
import SEARCH from '../assets/search.svg'
import WIND from '../assets/wind.svg'
import HUMIDITY from '../assets/waves.svg'
import { useEffect } from 'react'
import SUN from '../assets/sun.svg'
import MOON from '../assets/moon.svg'
import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import THERM from '../assets/thermometer-sun.svg'
import PRESSURE from '../assets/tornado.svg'


function WeatherCard() {
    const { theme, toggleTheme } = useContext(ThemeContext);
     const today = new Date();
     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const currentDay = days[today.getDay()];
        const [data,setData]=useState(false)
        const inputRef=useRef()
 
 
    const search=async(city)=>{
        try {
            if(!city){
                alert("Please enter a city name");
                return};
            const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`;
        const response = await fetch(url);
            const data = await response.json();
            if(!response.ok){
                alert(data.message);
                return;     
            }
        console.log(data);
        console.log(theme)
        setData({
            photo:data.weather[0].icon,
            humidity:data.main.humidity,
            windSpeed:data.wind.speed,
            city:data.name,
            pressure:data.main.pressure,
            feels:data.main.feels_like,
            description:data.weather[0].main,
            temprature:Math.floor(data.main.temp)
          
        })
            
        } catch (error) {
            setData(false);
            console.error("error in fetching weather data");
        }
    }
    useEffect(()=>{
        search("Hyderabad");
    },[])
  


    return (
        <div
            style={{
                background: 'var(--card-bg-color)',
                color: 'var(--text-color)',
                boxShadow: 'var(--card-shadow)',
                border: '1px solid var(--card-border)'
            }}
            className="p-6 h-3/4 min-w-1/4 rounded-xl transition-colors duration-300"
        >
            <div className='flex justify-center'>
                <input
                    type="text"
                    ref={inputRef}
                    placeholder='Enter city name'
                    style={{
                        background: 'var(--input-bg)',
                        color: 'var(--input-text)',
                        border: '1px solid var(--card-border)',
                        '::placeholder': { color: 'var(--input-placeholder)' }
                    }}
                    className="rounded-3xl p-2 mr-2 hover:shadow-2xl transition-colors duration-300"
                />
                <img className='' src={SEARCH} alt="" onClick={() => search(inputRef.current.value)} />
                <button onClick={toggleTheme} className='ml-4'>
                    {theme === 'light' ? <img src={SUN} alt="Light mode" /> : <img src={MOON} alt="Dark mode" />}
                </button>
            </div>

            {data ? (
                <div className='flex flex-col justify-center items-center mt-4 space-y-2'>
                    <h2 className='text-2xl text-white font-extrabold'>{data.city}</h2>
                    <img src={`https://openweathermap.org/img/wn/${data.photo}@2x.png`} alt="Weather icon" className="h-25 w-25 weather-icon" />
                    <p className='text-5xl text-white text-center'>{data.temprature}°</p>
                    <p className='font-bold text-2xl text-white text-center'>{data.description}</p>
                    <div className='w-full font-bold text-start'>
                        <p>{currentDay}</p>
                        <hr />
                    </div>
                    <div className='grid grid-cols-2 text-white gap-4 mt-4 justify-between w-full'>
                        <div style={{ background: 'var(--accent)', color: 'var(--button-text-color)' }} className="flex gap-2 p-3 rounded-lg">
                            <img src={HUMIDITY} alt="" className='h-5 w-5 flex items-center' />
                            <div>
                                <p>Humidity</p>
                                <p className='font-bold'>{data.humidity}</p>
                            </div>
                        </div>
                        <div style={{ background: 'var(--accent)', color: 'var(--button-text-color)' }} className="flex gap-2 p-3 rounded-lg">
                            <img src={WIND} alt="" className='h-5 w-5' />
                            <div>
                                <p>Wind Speed</p>
                                <p>{data.windSpeed}km/h</p>
                            </div>
                        </div>
                        <div style={{ background: 'var(--accent)', color: 'var(--button-text-color)' }} className="flex gap-2 p-3 rounded-lg">
                            <img src={THERM} alt="" className='h-5 w-5 flex items-center' />
                            <div>
                                <p>Feels like</p>
                                <p className='font-bold'>{data.feels}</p>
                            </div>
                        </div>
                        <div style={{ background: 'var(--accent)', color: 'var(--button-text-color)' }} className="flex gap-2 p-3 rounded-lg">
                            <img src={PRESSURE} alt="" className='h-5 w-5 flex items-center' />
                            <div>
                                <p>Pressure</p>
                                <p className='font-bold'>{data.pressure}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default WeatherCard
