import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
  useRouteMatch
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = ({ notification }) => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <p>
        <Link style={padding} to='/'>anecdotes</Link>
        <Link style={padding} to='/create'>create new</Link>
        <Link style={padding} to='/about'>about</Link>
      </p>
      <p>{notification}</p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <p>
        for more info see <a href={`${anecdote.info}`}>{anecdote.info}</a>
      </p>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')

  const { reset: resetContent, ...content } = useField('content')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetInfo, ...info } = useField('info')

  console.log('content: ', content)
  console.log('author: ', author)
  console.log('info: ', info)

  const history = useHistory()


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history.push('/')
  }

  const resetInputFields = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content}
          // name='content'
          // type={content.type}
          // value={content.value}
          // onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input {...author}
          // name='author'
          // type={author.type}
          // value={author.value}
          // onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input {...info}
          // name='info'
          // type={info.type}
          // value={info.value}
          // onChange={info.onChange}
          />
        </div>
        <button type='submit'>
          create
        </button>
        <button type="button" onClick={resetInputFields}>
          reset
        </button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    console.log('anecdote: ', anecdote)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification(``)
    }, 10000)
  }

  const match = useRouteMatch('/anecdotes/:id')

  const anecdote = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <Menu notification={notification} />
      <Switch>
        <Route path='/anecdotes/:id'>
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path='/create'>
          <CreateNew addNew={addNew} />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>

  )
}

export default App;