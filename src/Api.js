

const Api_key = "30e2eadde13d5198c8949cee41dc8ca5";
export function requestMaps (location) {
	return   fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${Api_key}`)
		.then(res => res.json())
		.catch((err) => err.message);
}


export async function requestForecast (lat, lon) {
  return 	fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${Api_key}&units=metric`)
}
