const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const tokenExtractor = require("../utils/middleware").tokenExtractor
const userExtractor = require("../utils/middleware").userExtractor
const blog = require('../models/blog')




blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.status(200).json(blogs.map((blog) => blog.toJSON()))
})



blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.status(200).json(blog.toJSON())
})



blogsRouter.post('/', [tokenExtractor, userExtractor], async (request, response) => {
  const body = request.body

  if (!body || !body.url || !body.title) {
    response.status(400).json({ error: 'blog missing url or title' })
  } else {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog.toJSON())
  }
})



blogsRouter.delete('/:id', [tokenExtractor, userExtractor], async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(401).json({ error: "Blog not found" })
  }

  if (!request.token || !request.decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user

  if (blog.user.toString() !== user._id.toString()) {
    response.status(401).json({ error: 'Unauthorized action' })
  }
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})



blogsRouter.put('/:id', [tokenExtractor, userExtractor], async (request, response) => {
  const body = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true
  })
  response.status(202).json(updatedBlog.toJSON())
})



module.exports = blogsRouter