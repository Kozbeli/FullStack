import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select'

const NewBirthyear = () => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)

  const result = useQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.message)
    }
  })

  if (!result) {
    return (
      <div>loading...</div>
    )
  }

  const options = result.data.allAuthors.map(author => {
    return { value: author.name, label: author.name }
  })

  const submit = (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: selectedOption,
        setBornTo: parseInt(born)
      }
    })
    
    setBorn('')
    setSelectedOption(null)
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedOption}
          onChange={((target) => setSelectedOption(target.value))}
          options={options}
        />
        <div>
          born
          <input onChange={({ target }) => setBorn(target.value)} />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default NewBirthyear