import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificateAbout } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  console.log(createAnecdote)
  console.log(props.createAnecdote)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote(content)
    props.notificateAbout(`You added '${content}'`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (value) => {
      dispatch(createAnecdote(value))
    },
    notificateAbout: (value) => {
      dispatch(notificateAbout(value, 5))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)