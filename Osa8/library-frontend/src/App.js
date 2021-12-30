import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommend from './components/Recommend'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  const booksResult = useQuery(ALL_BOOKS)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem('user-token'))
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  if (booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token
          ?
          <>
            <button onClick={() => setPage('newBook')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommendations</button>
            <button onClick={() => logout()}>logout</button>
          </>
          :
          <button onClick={() => setPage('login')}>login</button>
        }

      </div>
      <Authors
        show={page === 'authors'}
      />
      <Books
        show={page === 'books'}
        books={booksResult.data.allBooks}
      />
      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
      <NewBook
        show={page === 'newBook'}
      />
      <Recommend
        show={page === 'recommend'}
      />
    </div>
  )
}

export default App