import React from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { create } from '../reducers/blogReducer'
import { notifyWith } from '../reducers/notificationReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const user = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))


  const addBlog = (event) => {
    event.preventDefault()

    const blog = {
      title: title.value,
      author: author.value,
      url: url.value,
      user: {
        name: user.name,
        username: user.username
      },
      likes: 0
    }
    console.log('added blog: ', blog)

    resetTitle()
    resetAuthor()
    resetUrl()

    dispatch(create(blog))
    dispatch(notifyWith(`New blog was created '${blog.title}'`, 'success', 5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input {...title}
          />
        </div>
        <div>
          author:
          <input {...author}
          />
        </div>
        <div>
          url:
          <input {...url}
          />
        </div>
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm