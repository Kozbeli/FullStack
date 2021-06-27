import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import personService from './service/persons'
import Notification from './components/Notification'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errorType, setErrorType] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    const remove = window.confirm(`Delete ${person.name}?`)
    if (remove) {
      personService
        .remove(person)
        .then(returnedPerson => {
          const index = persons.indexOf(person)
          const copy = [...persons]
          copy.splice(index, 1);
          setPersons(copy)
          notificate(`Removed ${person.name}`, `green`)
        })
        .catch(error => {
          notificate(`Information of ${person.name} has already been removed from server`, `red`)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const exists = persons.some(person => person.name === newName)

    if (exists) {

      const update = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`)

      if (update) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }
        const { id } = person

        personService
          .update(changedPerson, id)
          .then(returnedPerson => {
            setPersons(persons.map(p => (p.id !== id ? p : returnedPerson)))
            notificate(`Updated ${returnedPerson.name}`, `green`)
          })
          .catch(error => {
            notificate(`Information of ${person.name} has already been removed from server`, `red`)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          notificate(`Added ${returnedPerson.name}`, `green`)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToShow = (filter.length === 0)
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const notificate = (message, errorType) => {
    setErrorMessage(message)
    setErrorType(errorType)
    setTimeout(() => {
      setErrorMessage(null)
      setErrorType(null)
    }, 5000)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={errorMessage}
        errorType={errorType}
      />
      <Filter
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={personsToShow}
        remove={deletePerson}
      />
    </div>
  )
}


export default App