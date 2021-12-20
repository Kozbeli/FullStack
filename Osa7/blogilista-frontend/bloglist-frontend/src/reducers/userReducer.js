import loginService from '../services/login'
import blogService from '../services/blogs'
import { notifyWith } from './notificationReducer'

const storageKey = 'loggedBloglistUser'

const initialUser = JSON.parse(window.localStorage.getItem(storageKey))

const userReducer = (state = initialUser, action) => {
  // console.log('STATE: ', state)
  // console.log('ACTION: ', action)

  switch (action.type) {
    case 'SET_USER': {
      return action.data.user
    }
    case 'LOG_OUT': {
      return action.data.user
    }
    default: {
      return state
    }
  }
}

export const setUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem(storageKey)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: {
          user: user
        },
      })
    }
  }
}


export const login = (username, password) => {
  return async dispatch => {

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(storageKey, JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser())
      dispatch(notifyWith(`${user.name} welcome back!`, 'success', 10))
    } catch (error) {
      dispatch(notifyWith('Wrong username or password!', 'error', 10))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.removeItem(storageKey)
    dispatch({
      type: 'LOG_OUT',
      data: {
        user: null
      }
    })
  }
}

export default userReducer