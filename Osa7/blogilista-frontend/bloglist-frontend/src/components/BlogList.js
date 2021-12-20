import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Table } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const blogFormRef = React.createRef()
  return (
    <div>
      <Table striped>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        <tbody>
          {sortedBlogs.map(blog =>
            <tr key={blog.id}>
              <Blog
                key={blog.id}
                name='blog'
                blog={blog}
              />
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList