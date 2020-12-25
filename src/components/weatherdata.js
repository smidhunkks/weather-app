import { useState } from 'react';
import cloud from '../assets/cloud.png'

function Displaydetail(props) {
    const api_key = '4a05fc94ac99108e63f6df7050c2f823';
    const { data, forecast } = props;


    console.log(forecast)

    let date = new Date();
    let month = { 0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December" };
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    /*-----------------------------------------------------------Weather forecast component listing---------------------------------------------------------- */
    let finalforecast = []
    if (forecast != undefined && forecast.cod!="400") {
        let i = 0;
        while (i < 27) {
            finalforecast.push(
                <div className="forecast">
                    <div className="forecast-time">{forecast != undefined  ? new Date(forecast.hourly[i].dt * 1000).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : "N/A"}</div>
                    <div className="forecast-day">{forecast != undefined  ? month[new Date(forecast.hourly[i].dt * 1000).toLocaleDateString([], { month: '2-digit' }) - 1].slice(0, 3) : "N/A"} {forecast.hourly != undefined ? new Date(forecast.hourly[i].dt * 1000).toLocaleDateString([], { day: '2-digit' }) : "N/A"}</div>
                    <div className="forecast-temp">{forecast != undefined  ? Math.floor(forecast.hourly[i].temp - 273.15) : "N/A"}°C</div>
                </div>);
            i = i + 3;
        }
    }
    /*-----------------------------------------------------------Weather forecast component listing---------------------------------------------------------- */

    return (
        <div className="result-section" >
            <div className="mid-row">
                <div className="mid-row-element">
                    <div className="mid-row-element-inner"><h1 className="location">{data.name == undefined || data.cod == "404" ? "City not Found" : data.name},{data.sys == undefined ? "N/A" : data.sys.country}</h1>
                        <h2 className='daydate'>{day[date.getDay()]},{month[date.getMonth() - 1]} {date.getDate()}</h2></div>

                </div>
                <div className="center-box">
                    <div className="center-box-inner">
                        <div className="grid-item">
                            {data.main == undefined ? "N/A" : Math.floor(data.main.temp_min - 273.15)}°C <br></br>Low
             </div>
                        <div className="grid-item">
                            {data.wind == undefined ? "N/A" : data.wind.speed}mph <br></br>Wind
             </div>
                        <div className="grid-item">
                            {data.sys == undefined ? "N/A" : new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br></br>Sunrise
                </div>
                        <div className="grid-item">
                            {data.main == undefined ? "N/A" : Math.floor(data.main.temp_max - 273.15)}°C<br></br>High
             </div>
                        <div className="grid-item">
                            {data.main == undefined ? "N/A" : data.main.humidity}%<br></br>Rain
                </div>
                        <div className="grid-item">
                            {data.sys == undefined ? "N/A" : new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<br></br>Sunset
                </div>
                    </div>
                </div>
                <div className="mid-row-element">
                    <div className="mid-row-element-inner">
                        <h1 className="temphead">{data.sys == undefined ? "N/A" : Math.floor(data.main.temp - 273.15)}°C</h1>
                        <h2 className="misty">{data.weather == undefined ? "N/A" : data.weather[0].description.toUpperCase()}</h2>
                    </div>
                    <img src={cloud} className="cloud"></img>
                </div>
            </div>

            <div className="bottom-row">
                <h2 className="forecast-head">Forecast</h2><br></br>

                <div className="bottom-row-cards">
                    {finalforecast != undefined ? finalforecast : "N/A"}
                </div>
            </div>

        </div>
    )
}
export default Displaydetail;