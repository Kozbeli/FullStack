import React from 'react'
import { connect } from 'react-redux'
import { incrementVotesOf } from '../reducers/anecdoteReducer'
import { notificateAbout } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes} <button onClick={handleClick}>votes</button>
      </div>
    </div>
  )
}

const Anecdotes = (props) => {
  const vote = id => {
    props.incrementVotesOf(id)
  }

  const display = content => {
    props.notificateAbout(`You voted '${content}'`, 10)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          name="anecdote"
          anecdote={anecdote}
          handleClick={() => {
            vote(anecdote.id)
            display(anecdote.content)
          }}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === 'ALL') {
    return {
      anecdotes: state.anecdotes
    }
  }

  return {
    anecdotes: (state.filter.length === 0
      ? state.anecdotes
      : state.anecdotes.filter(a =>
        a.content.toLowerCase().includes(state.filter.toLowerCase())
      )
    )
  }
}

const mapDispatchToProps = {
  incrementVotesOf,
  notificateAbout,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Anecdotes)