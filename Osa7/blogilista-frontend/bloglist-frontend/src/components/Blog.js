import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { like, remove } from '../reducers/blogReducer'
import { notifyWith } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const handleLike = async () => {
    dispatch(like(blog))
    dispatch(notifyWith(`You liked blog '${blog.title}'`, 'success', 10))
  }

  const handleRemove = async () => {
    dispatch(remove(blog))
  }

  const own = user.username === blog.user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const label = visible ? 'hide' : 'view'

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <td>
          <Link to={`/blogs/${blog.id}`}>
            <i>{blog.title}</i>
          </Link>
        </td>
        <td>
          by {blog.author}
        </td>
        <td>
          <button onClick={() => setVisible(!visible)}>{label}</button>
        </td>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {own && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </div >
  )
}

export default Blog