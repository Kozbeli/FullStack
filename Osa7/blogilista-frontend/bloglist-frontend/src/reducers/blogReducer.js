import blogService from '../services/blogs'
import { notifyWith } from './notificationReducer'

const blogReducer = (state = [], action) => {
  // console.log('STATE: ', state)
  // console.log('ACTION, ', action)

  switch (action.type) {

    case 'INIT_BLOGS': {
      return action.data
    }

    case 'NEW_BLOG': {
      return [...state, action.data.blog]
    }

    case 'LIKE_BLOG': {
      const changedBlog = action.data.blog
      return state.map(blog =>
        blog.id !== changedBlog.id
          ? blog
          : changedBlog
      )
    }

    case 'ADD_COMMENT': {
      const changedBlog = action.data.blog
      return state.map(blog =>
        blog.id !== changedBlog
          ? blog
          : changedBlog
      )
    }

    case 'REMOVE_BLOG': {
      const removedBlog = action.data.blog
      return state.filter(blog => blog.id !== removedBlog.id)
    }

    default: {
      return state
    }
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log('blogs: ', blogs)
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const create = (blog) => {
  return async dispatch => {
    const savedBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: { blog: savedBlog }
    })
  }
}

export const like = (blog) => {
  return async dispatch => {
    const blogToChange = await blogService.getOne(blog.id)
    const changedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1
    }
    await blogService.update(blog.id, changedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: { blog: changedBlog }
    })
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const blogToChange = await blogService.getOne(blog.id)
    const changedBlog = {
      ...blogToChange,
      comments: blogToChange.comments.concat(comment)
    }
    console.log('changedBlog: ', changedBlog)
    await blogService.update(blog.id, changedBlog)
    dispatch({
      type: 'ADD_COMMENT',
      data: { blog: changedBlog }
    })
  }
}

export const remove = (blog) => {
  return async dispatch => {
    const confirmed = window.confirm(`Remove ${blog.title} by ${blog.author}`)
    if (confirmed) {
      await blogService.remove(blog.id)
      dispatch(notifyWith(`You removed blog '${blog.title}'`, 10))
      dispatch({
        type: 'REMOVE_BLOG',
        data: { blog, }
      })
    }
  }
}

export default blogReducer