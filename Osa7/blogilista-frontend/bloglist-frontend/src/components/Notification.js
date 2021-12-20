import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const message = useSelector(state => state.notification.message)
  // const errorType = useSelector(state => state.notification.errorType)
  const notification = useSelector(state => state.notification)

  // const style = {
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   color: notification.messageType === 'success' ? 'green' : 'red',
  //   background: 'lightgrey'
  // }

  if (!message || message === '' || message === null) {
    return null
  }

  const variant = notification.messageType === 'success' ? 'success' : 'danger'

  return (
    <div>
      {(message &&
        <Alert variant={variant}>
          {message}
        </Alert>
      )}
      {/* <div className={errorType} style={style}>
        {message}
      </div> */}
    </div>

  )
}

export default Notification