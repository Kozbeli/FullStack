import React, { useState, useEffect } from 'react'
import { ALL_BOOKS } from '../queries'
import { useLazyQuery } from '@apollo/client'

const Books = (props) => {
  const [allBooks, result] = useLazyQuery(ALL_BOOKS)
  const [booksToShow, setBooksToShow] = useState(props.books)

  const showGenre = (genre) => {
    allBooks({ variables: { genre: genre } })
  }

  useEffect(() => {
    if (result.data) {
      setBooksToShow(result.data.allBooks)
    }
  }, [result]) // eslint-disable-line

  if (result.loading) {
    return <div>loading...</div>
  }

  const genres = [...new Set(props.books.map(b => b.genres).flat())]

  console.log('booksToShow:', booksToShow)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g =>
        <button key={g} onClick={() => showGenre(g)}>{g}</button>
      )}
      <button onClick={() => showGenre('')}>show all</button>
    </div>
  )
}

export default Books