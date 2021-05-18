import React, {useState} from 'react'

const Header = (props) => {
    return (
        <div>
            <h1>
                {props.name}
            </h1>
        </div>
    )
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.value}</td>
            <td>{props.percent}</td>
        </tr>
    )
}

const Statistics = ({good, neutral, bad}) => {
    const sum = good - bad
    const count = good + neutral + bad
    if (count > 0) {
        return (
            <div>
                <table>
                    <tbody>
                    <StatisticLine name='good' value={good}/>
                    <StatisticLine name='neutral' value={neutral}/>
                    <StatisticLine name='bad' value={bad}/>
                    <StatisticLine name='all' value={count}/>
                    <StatisticLine name='average' value={sum / count}/>
                    <StatisticLine name='positive' value={good * 100 / count} percent='%'/>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                No feedback given
            </div>
        )
    }
}

const Button = ({handleClick, text}) => (
    <button onClick={handleClick}>{text}</button>
)


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header name='give feedback'/>
            <Button handleClick={() => setGood(good + 1)} text='good'/>
            <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
            <Button handleClick={() => setBad(bad + 1)} text='bad'/>
            <Header name='statistics'/>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

export default App