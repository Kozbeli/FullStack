import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, like } from '../reducers/blogReducer'
import { notifyWith } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { addComment } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const currentBlog = blogs.find(b => b.id === blog.id)

  const { reset: resetComment, ...comment } = useField('text')

  const handleLike = async () => {
    dispatch(like(blog))
    dispatch(notifyWith(`You liked blog '${blog.title}'`))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('comment: ', comment.value)
    dispatch(addComment(blog, comment.value))
    resetComment()
  }

  return (
    <div className='blog'>
      <div>
        <h2>{blog.title} {blog.author}</h2>
      </div>
      <div>{blog.url}</div>
      <div>likes {blog.likes}<button onClick={handleLike}>like</button></div>
      <div>added by {blog.user.name}</div>
      <div>
        <b>comments</b>
        <div>
          <form onSubmit={handleSubmit}>
            <input {...comment} />
            <button>add comment</button>
          </form>
        </div>
        <ul>
          {currentBlog.comments.map(comment =>
            <li key={comment.id}>{comment}</li>
          )}
        </ul>
      </div>
    </div >

  )
}

export default Blog