import React, {useState} from 'react'

const Header = ({text}) => {
    return (
        <h1>
            {text}
        </h1>
    )
}

const Anecdote = ({text}) => {
    return (
        <div>
            {text}
        </div>)
}

const Votes = ({votes}) => {
    return (
        <div>
            has {votes} votes
        </div>
    )
}

const Content = ({header, text, votes}) => {
    return (
        <div>
            <Header text={header}/>
            <Anecdote text={text}/>
            <Votes votes={votes}/>
        </div>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
    ]

    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])

    const handleVote = (selected) => {
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

    const max = points.reduce((a, b) => {
        return Math.max(a, b)
    })
    const maxPoints = points.indexOf(max)

    return (
        <div>
            <Content header='Anecdote of the day' text={anecdotes[selected]} votes={points[selected]}/>
            <button onClick={() => handleVote(selected)}>vote</button>
            <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
            <Content header='Anecdote with most votes' text={anecdotes[maxPoints]} votes={points[maxPoints]}/>
        </div>
    )
}

export default App