import React from 'react'
import Notification from './Notification'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const dispatch = useDispatch()

  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username.value, password.value))
    resetUsername()
    resetPassword()
  }

  return (
    <div className='container'>
      <h2>login to application</h2>

      <Notification />



      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control {...username} />
          <Form.Label>password</Form.Label>
          <Form.Control {...password} />
          <Button variant='primary' type='submit'>
            login
          </Button>
        </Form.Group>
      </Form>

      {/* <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username}
          />
        </div>
        <div>
          password
          <input {...password}
          />
        </div>
        <button id='login'>login</button>
      </form> */}
    </div>
  )
}

export default LoginForm