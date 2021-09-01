const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const helper = require('../tests/test_helper')

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  users = await helper.usersInDb()
  usernames = users.map(user => user.username)

  if (!(body.username && body.password)) {
    return response.status(400).json({ error: 'missing username or password' })
  }

  if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({
      error: 'username and password should contain at least 3 characters'
    })
  }

  if (usernames.includes(body.username)) {
    return response.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    password: passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

  response.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter