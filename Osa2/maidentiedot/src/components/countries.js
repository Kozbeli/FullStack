import React from 'react'
import Weather from './weather'

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        capital {country.capital}
      </div>
      <div>
        population {country.population}
      </div>
      <Languages languages={country.languages} />
      <Flag flag={country.flag} />
    </div>
  )
}

const Languages = ({ languages }) => {
  return (
    <div>
      <h3>Spoken languages</h3>
      <div>
        <ul>
          {languages.map(language => (
            <li key={language.name}>
              {language.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Flag = ({ flag }) => {
  return (
    <div>
      <img
        src={flag}
        alt=''
        width="200"
      />
    </div>
  )
}

const Countries = ({ countriesToShow, show }) => {
  if (countriesToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        {countriesToShow.map(country => (
          <div key={country.name}>
            <Country country={country} />
            <Weather capital={country.capital} />
          </div>
        ))}
      </div>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country => (
          <div key={country.name}>
            {country.name}
            <button onClick={() => show(country.name)}>show</button>
          </div>
        ))}
      </div>
    )
  }
}

export default Countries