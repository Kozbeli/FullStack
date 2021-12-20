const initialState = {
  notification: {
    message: '',
    messageType: ''
  }
}

const notificationReducer = (state = initialState, action) => {
  // console.log('STATE: ', state)
  // console.log('Action: ', action)

  switch (action.type) {
    case 'INIT_NOTIFICATION': {
      return action.data
    }
    case 'SET_NOTIFICATION': {
      return action.data.notification
    }
    default: {
      return state
    }
  }
}

export const initNotification = () => {
  return {
    type: 'INIT_NOTIFICATION',
    data: initialState
  }
}

export const notifyWith = (message, messageType, delay) => {
  return async dispatch => {
    dispatch(initNotification())
    dispatch(setNotification(message, messageType))
    setTimeout(() => {
      dispatch(setNotification('', ''))
    }, (delay * 1000))
  }
}

export const setNotification = (message, messageType) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {
      notification: {
        message,
        messageType
      }
    }
  }
}

export default notificationReducer