import { React, useRef } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    msrginBottom: 5,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const like = () => {
    const updatedBlog = {
      ...blog,
      user: blog.user.id,
      likes: (blog.likes + 1)
    }
    updateBlog(blog.id, updatedBlog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  const loggedUser = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

  const buttonRef = useRef()
  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel='view' ref={buttonRef} className='togglable'>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={like} className='like'>like</button></div>
        <div>{blog.author}</div>
        {loggedUser.username === blog.user.username &&
          <button onClick={remove}>remove</button>
        }
      </Togglable>
    </div>
  )
}

export default Blog