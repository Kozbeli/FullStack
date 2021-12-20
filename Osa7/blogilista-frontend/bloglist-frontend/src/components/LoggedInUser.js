import React, { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'

const LoggedInUser = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  return (
    <div>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LoggedInUser