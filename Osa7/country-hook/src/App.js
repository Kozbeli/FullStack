import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState({})

  useEffect(() => {

    try {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
        .then(response => {
          // console.log('response: ', response)
          // console.log('response.data: ', response.data)
          // console.log('response.data[0]: ', response.data[0])
          // console.log('country.name.common: ', response.data[0].name.common)
          const info = response.data[0]
          setCountry({
            found: true,
            data: {
              name: info.name.common,
              capital: info.capital[0],
              population: info.population,
              flag: info.flags.png
            },
          })
        })
    } catch (e) {
      setCountry({
        found: false,
        data: {}
      })
    }
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`} />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
