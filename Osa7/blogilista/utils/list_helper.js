const _ = require('loadsh')

const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const reducer = (a, b) => a + b.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

  if (blogs.length === 0) {
    return null
  }

  const max = blogs.reduce((a, b) => a.likes > b.likes ? a : b)

  return {
    title: max.title,
    author: max.author,
    likes: max.likes,
  }
}

const mostBlogs = (blogs) => {
  const key = (blog) => blog.author
  const groupedBlogs = _.groupBy(blogs, key)
  const blogsByAuthor = _.mapValues(groupedBlogs, (blog) => blog.length)
  const mostBlog = Object.entries(blogsByAuthor).reduce((a, b) => a[1] > b[1] ? a : b)
  const result = {
    'author': mostBlog[0],
    'blogs': mostBlog[1]
  }

  return result
}

const mostLikes = (blogs) => {
  // console.log(' ')
  // console.log('blogs')
  // console.log(blogs)
  // console.log(' ')
  const key = (blog) => blog.author
  const groupedBlogs = _.groupBy(blogs, key)
  // console.log(' ')
  // console.log('grouped blogs')
  // console.log(JSON.stringify(groupedBlogs, null, 2))
  // console.log(' ')
  const blogsByLikes = _.mapValues(groupedBlogs, totalLikes)
  // console.log(' ')
  // console.log(`blogs by like: `)
  // console.log(JSON.stringify(blogsByLikes, null, 2))
  // console.log(' ')
  const bestAuthor = Object.entries(blogsByLikes).reduce((a, b) => a[1] > b[1] ? a : b)
  const result = {
    'author': bestAuthor[0],
    'likes': bestAuthor[1]
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}