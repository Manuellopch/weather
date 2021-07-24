import React, {useEffect, useState} from "react";
import Chart from "./Chart";
import {requestMaps, requestForecast} from "./Api";
import moment from "moment";


const Weather = () => {
	const [location, updateLocation] = useState("Huehuetenango");
	const [maps, setMaps] = useState({});
	const [output, setOutput] = useState({});

	useEffect(()  =>{
			requestlatlon()
	},[location])

	const requestlatlon = (e) => {
		requestMaps(location)
			.then(response => {
				const lat = response.coord.lat;
				const long = response.coord.lon;
				requestDates(lat, long);
			}).catch((err) => err.message);
	};

	const requestDates = (lat, long) => {
		requestForecast(lat, long)
			.then(res => res.json())
			.then(res => {
				setMaps({
					timeZone: res.timezone,
					date_value: res.current.dt,
					temperature: res.current.temp,
					description: res.current.weather[0].description,
					windSpeed: res.current.wind_speed,
					humidity: res.current.humidity,
					sunrise: moment.unix(res.current.sunrise).format("h:mm A"),
					sunset: moment.unix(res.current.sunset).format("h:mm A"),
					imgCode: res.current.weather[0].icon,
					labels: res.daily.map((date) => {
						return moment.unix(date.dt).format("MMMM Do");
					}),
					forecastData: res.daily.map((daily_temp) => {
						return daily_temp.temp.day;
					}),
					dailyWeathers: res.daily.map((daily_temp) => {
						 return setOutput ({id: daily_temp.id, date: daily_temp.dt, temp: daily_temp.temp.day, img: daily_temp.weather[0].icon})
					}).slice(1, 6),
				})}).catch((err) => err.message)
	}

	console.log(output.id)


	return(
		<>
			<div className={"search-params"}>
			<form onSubmit={requestlatlon}>
				<label className={"location"}>
						Your City
					<input id={"location"} value={location}  placeholder={"location"} onChange={event => updateLocation(event.target.value)} />
				</label>
			</form>
				<div className={"box"}>
					<div><p className={"name"}>{location}</p></div>
					<div><p className={"temp"}>{Math.round(maps.temperature)}°C</p></div>
					<div><p className={"temp-a"}>{maps.description}</p></div>
					<div><p className={"temp-b-1"}>Humidity</p> <p className={"temp-b"}>{maps.humidity}%</p></div>
					<div><p className={"temp-c-1"}>Wind Speed</p> <p className={"temp-c"}>{maps.windSpeed}km/h</p></div>
					<img  className={"image"} src={`https://openweathermap.org/img/wn/${maps.imgCode}.png`}/>
					<Chart  temp={maps.forecastData} labels={maps.labels}   />
				</div>
				<div className={"box-card"}>
					<div className={"weather-card"}>
						<p>{moment.unix(output.date).format("MMMM Do")}</p>
						<img src={`https://openweathermap.org/img/wn/${output.img}@2x.png`} />
						<p>Temperature</p>
						<p>{output.temp}°C</p>
					</div>
				</div>
			</div>
		</>
	)
};

export default Weather
