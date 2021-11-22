import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorType, setErrorType] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => {
        return b.likes - a.likes
      }))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificate('wrong username or password', 'red')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('Logging out')
    window.localStorage.removeItem('loggedBloglistUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('Creating a new blog')
    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      notificate(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'green')
    } catch (exception) {
      setErrorMessage('failed to create a blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (id, blogObject) => {
    console.log('Updating a new blog')
    const changedBlog = await blogService.update(blogObject)
    console.log(JSON.stringify(changedBlog, null, 2))
    setBlogs(blogs.map(blog => blog.id === changedBlog.id ? changedBlog : blog))

    console.log('sorted blogs')
    console.log(' ')
    console.log(JSON.stringify(sortedBlogs, null, 2))
  }

  const removeBlog = async (blog) => {
    const confirmed = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (confirmed) {
      console.log('Removing a blog')
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  const notificate = (message, errorType) => {
    setErrorMessage(message)
    setErrorType(errorType)
    setTimeout(() => {
      setErrorMessage(null)
      setErrorType(null)
    }, 5000)
  }

  const loggedInUser = () => (
    <div>
      <h2>blogs</h2>
      <div>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <br />
        <br />
      </div>
    </div>
  )

  const blogForm = () => {
    return (
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      {user === null ?
        <div>
          < LoginForm
            errorMessage={errorMessage}
            errorType={errorType}
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div> :
        <div>
          {loggedInUser()}
          {blogForm()}
          {sortedBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          )}
        </div>

      }
    </div>
  )
}

export default App