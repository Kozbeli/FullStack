import userService from '../services/users'

const userListReducer = (state = [], action) => {
  // console.log('Action: ', action)
  // console.log('STATE: ', state)

  switch (action.type) {

    case 'INIT_USERS': {
      return action.data
    }
    default: {
      return state
    }
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    // users.forEach(user => delete user.blogs)
    console.log('userReducer')
    console.log('users: ', users)
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default userListReducer