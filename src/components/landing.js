import './landing.css';
import Displaydetail from './weatherdata';
import search from '../assets/search-icon.png';
import { useState } from 'react';

const api_key = '4a05fc94ac99108e63f6df7050c2f823';
function Landing() {
    const [city, setcity] = useState({
        cityname: "",
    });
    const [weathdetail, addweather] = useState([])
    const [weathforecast, addforecast] = useState([])

    const getcity = (data) => {
        setcity({ ...city, cityname: data.target.value })
    }

    function checkSubmit(e) {
        if (e && e.keyCode == 13) {
            getweather(e)
        }
    }

    async function getweather(e) {
        e.preventDefault()
        /* console.log(city)*/
        if (city.cityname == '') {
            alert('enter city');
        } else {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.cityname}&appid=${api_key}`)
                .then((res) => res.json()
                )
                .then((data) => {
                    addweather({ data: data });
                    if (data.cod == 200)
                        return (fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=-${data.coord.lon}&exclude=current,minutely,daily&appid=${api_key}`)
                            .then((resp) => resp.json())
                            .then((data) => {
                                addforecast({ data: data });
                                /*console.log(weathdetail.data)
                                console.log(weathforecast.data)*/
                            })
                        );
                });

            /*console.log(weathdetail.data)
            if (weathdetail.weather != undefined) {
                const forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weathdetail.data.coord.lat}&lon=-${weathdetail.data.coord.lon}&exclude=current,minutely,daily&appid=${api_key}`)
                    .then((res) => res.json())
                    .then((forecast) => forecast);
                addweather({ ...weathdetail, forecast: forecast })  
                console.log( "weather fetch"+weathdetail)
           forecastfetch(weathdetail.weather.coord.lat, weathdetail.weather.coord.lat);
            }

            console.log(weathforecast);
            console.log(weathdetail);*/
        }

    }

    return (
        <div className="App" >
            <div className="App-header">
                <h1>WEATHER</h1>
                <div className="search-box">
                    <div className="search-input" >
                        <input type="text" placeholder="Enter city name" name="city" onKeyPress={(e) => {
                            if (e.key == "Enter") {
                                getweather(e);
                            }
                        }} onChange={(e) => {
                            getcity(e)

                        }} ></input>
                        <button type="submit" onClick={async (e) => {

                            await getweather(e);

                        }} ><img src={search} ></img></button>
                    </div>
                </div>
            </div>
            {
                weathdetail.data != undefined ?

                    <Displaydetail forecast={weathforecast.data} data={weathdetail.data} />
                    : null
            }

        </div>
    );
}
export default Landing;
