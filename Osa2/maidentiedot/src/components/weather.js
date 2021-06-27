import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'


const api_key = process.env.REACT_APP_API_KEY
const apiUrl = 'http://api.weatherstack.com/current'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([])
  console.log('api key:', { api_key })
  console.log({ capital })

  const hook = () => {
    axios
      .get(`${apiUrl}?access_key=${api_key}&query=${capital}`)
      .then((response) => {
        console.log('promise fulfilled')
        setWeather(response.data.current)
      })
      .catch((error) => {
        console.warn("Error")
        console.info("error")
        console.error(error)
      })
  }

  useEffect(hook, [capital])

  return (
    weather && (
      <div>
        <h2>Weather in {capital} </h2>
        <div>
          <b>temperature: </b>
          {weather.temperature} Celsius
        </div>
        <img src={weather.weather_icons} alt={''} />
        <div>
          <b>wind: </b>
          {weather.wind_speed} mph direction {weather.wind_dir}
        </div>

      </div>
    )
  )
}

export default Weather