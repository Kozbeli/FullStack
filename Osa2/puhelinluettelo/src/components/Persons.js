import React from 'react'

const Persons = ({ persons, remove }) => {
  const rows = persons.filter(person => person.id)
    .map((person) => {
      return (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => remove(person.id)}>delete</button>
        </li>
      )
    })
  return (
    <ul>{rows}</ul>
  )
}

export default Persons