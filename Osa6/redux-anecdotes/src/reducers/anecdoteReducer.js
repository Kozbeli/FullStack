import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  // console.log('STATE: ', state)
  // console.log('ACTION', action)

  switch (action.type) {

    case 'INIT_ANECDOTES':
      return action.data

    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'UPDATE_ANECDOTE':
      console.log('STATE: ', state)
      const changedAnecdote = action.data.anecdote
      return state.map(anecdote =>
        anecdote.id !== changedAnecdote.id
          ? anecdote
          : changedAnecdote
      )

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const incrementVotesOf = (id) => {
  return async dispatch => {
    const anecdoteToChange = await anecdoteService.getOne(id)
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
    await anecdoteService.update(id, changedAnecdote)
    dispatch({
      type: 'UPDATE_ANECDOTE',
      data: { anecdote: changedAnecdote }
    })
  }
}

export default anecdoteReducer