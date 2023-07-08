import React from 'react'
import "../css/loading.css"
import wi from "../assets/weathericon.gif"

function Loading() {
    return (
        <div className="box-container">
            <img src={wi} alt="weather gif" />
            <h5>Allow Location Permission</h5>
            <p>Allow location permission to access your current location, and we'll provide you with personalized weather forecasts, including temperature, humidity, wind speed, and more. </p>
        </div>
    )
}

export default Loading
