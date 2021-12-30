import { useQuery } from '@apollo/client'
import { ALL_BOOKS, WHO_AM_I } from '../queries'
import React from 'react'

const Recommend = (props) => {
  const userResult = useQuery(WHO_AM_I)
  const bookResult = useQuery(ALL_BOOKS)

  if (bookResult.loading || userResult.loading) {
    return (
      <div>loading...</div>
    )
  }

  const user = userResult.data.me

  let books = []

  if (user) {
    books = bookResult.data.allBooks.filter(book =>
      book.genres.includes(user.favoriteGenre)
    )
  }



  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{user.favoriteGenre}</b></div>
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
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend