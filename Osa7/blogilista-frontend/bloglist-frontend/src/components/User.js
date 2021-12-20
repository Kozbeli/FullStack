import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {

  const blogs = useSelector(state => state.blogs)
  const blogsToShow = blogs.filter(blog => blog.user.id === user.id)

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <b>added blogs</b>
      <ul>
        {blogsToShow.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User