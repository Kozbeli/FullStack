import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
 import Countries from './components/countries'
import axios from 'axios'



const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const countriesToShow = (filter.length === 0)
    ? countries
    : countries
      .filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const show = (country) => {
    console.log('show country')
    setFilter(country)
  }

  return (
    <div>
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countriesToShow={countriesToShow}
        show={show}
      />
    </div>
  )
}


export default App