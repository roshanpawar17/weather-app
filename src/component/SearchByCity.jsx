import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BASE_KEY } from './ApiKey';
import { API_KEY } from './ApiKey';

import "../css/searchByCity.css"
import SearchCityData from './SearchCityData';

function SearchByCity() {

    const [city, setCity] = useState()
    const [show, setShow] = useState(false)
    const [sdata, setSdata] = useState({
        cityName: "",
        country: "",
        tempC: "",
        minTemp: "",
        maxTemp: "",
        weather: "",
        desc: "",
        feelsLike: "",
        wind: "",
        humidity: "",
        visibility: "",
        airPressure: ""
    })
   

    function handleCityName(e) {
        setCity(e.target.value)
        // console.log(e.target.value)
    }

    const notify = () => toast.warn("Please Enter City Name");
    const notifyCity = () => toast.error("City Not Found!");

    async function getCityData(e) {
        e.preventDefault()

        if(city != null && city != ""){
            
            const response = await fetch(`${BASE_KEY}q=${city}&appid=${API_KEY}`);
            const data = await response.json();
    
            // console.log(data)

            if(data.name == "" || data.name == null){
                notifyCity();
            }else{
                const weatherData = data.weather[0];
                const { id, main, description, icon } = weatherData;
        
                setSdata({
                    cityName: data.name,
                    country: data.sys.country,
                    tempC: Math.round(data.main.temp) - 273,
                    minTemp: Math.round(data.main.temp_min) - 273,
                    maxTemp: Math.round(data.main.temp_max) - 273,
                    weather: main,
                    desc: description,
                    feelsLike: Math.round(data.main.feels_like) - 273,
                    wind: Math.round(data.wind.speed * 2.23694),
                    humidity: data.main.humidity,
                    visibility: Math.round(data.visibility * 0.00062137119),
                    airPressure: data.main.pressure
                })
                
                
                setTimeout(()=>{
                    setShow(true)
                },1000)
            }
            
        }else{
            
            notify();
            
        }
        

        
    }
    
    

    return (
        <div className='city-container'>
            <form onSubmit={getCityData}>
                <input type="search" placeholder='Search By City' onChange={handleCityName} />
            </form>
            <br />
            {show ? <SearchCityData sd={sdata} /> : null}
            <ToastContainer />
        </div>
    )
}

export default SearchByCity
