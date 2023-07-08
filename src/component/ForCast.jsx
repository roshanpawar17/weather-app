import React, { useEffect, useState } from 'react'

import Loader from './Loader';
import { BASE_KEY } from './ApiKey';
import { API_KEY } from './ApiKey';

import { CiTempHigh } from 'react-icons/ci';
import { FiWind } from 'react-icons/fi';
import { WiHumidity } from 'react-icons/wi';
import { MdVisibility } from 'react-icons/md';
import { BiArrowToBottom } from 'react-icons/bi';
import { icons } from './WeatherIcons';

import "../css/forcast.css"
import SearchByCity from './SearchByCity';



function ForCast({ latitude, longitude }) {

  const [loading, setLoading] = useState(true)
  const [rdata, setRdata] = useState({
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

  const [wicon, setWIcon] = useState({
    icon: ""
  })

  let date = new Date();

  let time = date.toLocaleTimeString()
  const [ctime, setCTime] = useState(time)

  setInterval(() => {
    setCTime(new Date().toLocaleTimeString())
  }, 1000)

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let dt = date.getDate();
  let month = months[date.getMonth()]
  let year = date.getFullYear()



  async function data() {
    setLoading(false)  
    const response = await fetch(`${BASE_KEY}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    const data = await response.json();
    // console.log(data)

    const weatherData = data.weather[0];
    const { id, main, description, icon } = weatherData;

    setRdata({
      cityName: data.name,
      country: data.sys.country,
      tempC: Math.round(data.main.temp) - 273,
      minTemp: Math.round(data.main.temp_min) - 273,
      maxTemp: Math.round(data.main.temp_max) - 273,
      weather: main,
      desc: description,
      feelsLike: Math.round(data.main.feels_like) - 273,
      wind: Math.round(data.wind.speed*2.23694),
      humidity: data.main.humidity,
      visibility: Math.round(data.visibility*0.00062137119),
      airPressure: data.main.pressure
    })

    switch (main) {
      case "Haze":
        setWIcon({ icon: icons.CLEAR_DAY })
        break;
      case "Clouds":
        setWIcon({ icon: icons.CLOUDY})
        break;
      case "Rain":
        setWIcon({ icon: icons.RAIN })
        break;
      case "Snow":
        setWIcon({ icon: icons.SNOW })
        break;
      case "Dust":
        setWIcon({ icon: icons.WIND })
        break;
      case "Drizzle":
        setWIcon({ icon: icons.SLEET })
        break;
      case "Fog":
        setWIcon({ icon: icons.FOG })
        break;
      case "Smoke":
        setWIcon({ icon: icons.FOG })
        break;
      case "Tornado":
        setWIcon({ icon: icons.WIND })
        break;  
      default:
        setWIcon({ icon: icons.CLEAR_DAY })
        break;
    }

  }

  useEffect(() => {
    setTimeout(() => {
      data()
    }, 3000)
  }, [])


  if (loading) {
    return <Loader />
  }


  return (
    <>
    
      <div className='forcast-container'>
        <div className="top-section">
          <div className="date-section">
            <h2>{ctime}</h2>
            <h4>{day}, {dt} {month} {year}</h4>
          </div>
          <h2>{rdata.cityName} <span style={{fontSize: '15px'}}>{rdata.country}</span></h2>
        </div>
        <div className="middle-section">
          <img src={wicon.icon} alt='weather icon' />
          <h1>{rdata.tempC}°<span>C</span></h1><br />
          <span>{`Min Temp: ${rdata.minTemp}°c`}</span>
          <span>{`Max Temp: ${rdata.maxTemp}°c`}</span>
          <span>{rdata.weather} - {rdata.desc}</span>
        </div>
        <div className="bottom-container">
          <div className="cards">
            <div className="card-s">
              <h5 className="icon"><CiTempHigh/></h5>
              <p className="text">Feels like</p>
              <h2 className='value'>{rdata.feelsLike}°c</h2>
            </div>
            <div className="card-s">
              <h5 className="icon"><FiWind/></h5>
              <p className="text">Wind</p>
              <h2 className='value'>{rdata.wind} <span >mph</span> </h2>
            </div>
            <div className="card-s">
              <h5 className="icon"><WiHumidity/></h5>
              <p className="text">Humidity</p>
              <h2 className='value'>{rdata.humidity} <span>%</span></h2>
            </div>
            <div className="card-s">
              <h5 className="icon"><MdVisibility/></h5>
              <p className="text">Visibility</p>
              <h2 className='value'>{rdata.visibility} <span>mi</span></h2>
            </div>
            <div className="card-s">
              <h5 className="icon"><BiArrowToBottom/></h5>
              <p className="text">Air Pressure</p>
              <h2 className='value'>{rdata.airPressure} <span>hPa</span></h2>
            </div>
            
          </div>
        </div>
      </div>
      <SearchByCity/>

    </>
  )
}

export default ForCast
