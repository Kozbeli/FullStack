import React, { useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userListReducer'
import Notification from './components/Notification'
import { Routes, Route, Link } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import DetailedBlog from './components/DetailedBlog'
import { logout } from './reducers/userReducer'
// import { Nav, Navbar } from 'react-bootstrap'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar/'
import Button from '@material-ui/core/Button'







const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) {
    return (
      <div>
        <LoginForm />
      </div>
    )
  }

  return (
    <div className='container'>
      <Menu />
      <h2>blog app</h2>
      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/users/' element={<UserList />} />
        <Route path='/login/' element={<LoginForm />} />
        {users.map(user =>
          <Route
            key={user.id}
            path={`/users/${user.id}`}
            element={<User user={user} />}
          />
        )}
        {blogs.map(blog =>
          <Route
            key={blog.id}
            path={`/blogs/${blog.id}`}
            element={<DetailedBlog blog={blog} />}
          />
        )}
      </Routes>
    </div>
  )
}

const Menu = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  // const padding = {
  //   paddingRight: 5
  // }

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      {/* Bootstrap */}


      {/* <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-control='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>home</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/'>blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={padding} to='/users'>users</Link>
            </Nav.Link>
            <Nav.Link>
              <i style={{ color: 'green' }}>
                {user.name} logged in
                <Link to='/login'>
                  <button onClick={handleLogout}>logout</button>
                </Link>
              </i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}

      {/* Material-ui */}


      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>
            home
          </Button>
          <Button color='inherit' component={Link} to='/'>
            blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
          <Button color='inherit' component={Link} to='/'>
            <i style={{ color: 'green' }}>
              {user.name} logged in
              <Link to='/login'>
                <button onClick={handleLogout}>logout</button>
              </Link>
            </i>
          </Button>
        </Toolbar>
      </AppBar>
      <Notification />
    </div>

  )
}

export default App