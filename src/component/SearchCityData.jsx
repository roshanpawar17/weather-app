import React from 'react'


function SearchCityData(props) {
         
    return (
        <>
            <h2>{props.sd.cityName} <span style={{ fontSize: "15px" }}>{props.sd.country}</span></h2>
            <table className="table table-dark">

                <tbody>
                    <tr>
                        <th scope="row">Temperature</th>
                        <td>{props.sd.tempC}°c {props.sd.weather}</td>
                    </tr>
                    <tr>
                        <th scope="row">Humidity</th>
                        <td>{props.sd.humidity} <span>%</span></td>
                    </tr>
                    <tr>
                        <th scope="row">Visibility</th>
                        <td>{props.sd.visibility} <span>mi</span></td>
                    </tr>
                    <tr>
                        <th scope="row">Wind Speed</th>
                        <td>{props.sd.wind} <span >mph</span></td>
                    </tr>
                    <tr>
                        <th scope="row">Air Pressure</th>
                        <td>{props.sd.airPressure} <span>hPa</span></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default SearchCityData
