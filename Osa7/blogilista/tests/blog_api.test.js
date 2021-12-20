const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({ })
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({ })

    const user = {
      username: "testuser",
      name: "Test User",
      password: "password"
    }

    await api
      .post("/api/users")
      .send(user)
      .expect(200)

    const response = await api
      .post("/api/login")
      .send({ username: "testuser", password: "password" })
      .expect(200)

    token = response.body.token
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
  })

  test('id is defined', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    const idVals = blogsAtEnd.map(blog => blog.id)
    expect(idVals).toHaveLength(helper.initialBlogs.length)
    expect(idVals).toBeDefined()
  })

  describe('adding a new blog', () => {

    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(blog => blog.title)
      expect(titles).toContain(
        'Type wars'
      )
    })

    test('there are 0 likes by default', async () => {
      const noLikesBlog = {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      }

      const response = await api
        .post('/api/blogs')
        .send(noLikesBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(response.body.likes).toBeDefined()
      expect(response.body.likes).toBe(0)
    })

    test('bad request if title or url is missing', async () => {
      const badBlog = {
        author: "Willberemovedsoon",
      }

      await api
        .post('/api/blogs')
        .send(badBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(400)
    })
    test('bad request if token is missing', async () => {

      const badBlog = {
        title: "Blog without token",
        author: "Robert C. Martin",
        url: "www.mtv.fi",
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(badBlog)
        .set({Authorization: `bearer asdasdasd`})
        .expect(401)

      await api
        .post('/api/blogs')
        .send(badBlog)
        .expect(401)
    })
  })

  describe('deleting a blog', () => {
    test('blog can be deleted', async () => {
      const newBlog = {
        title: "New Blog",
        author: "New Author",
        url: "www.hs.fi",
        likes: 0
      }

      const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .set({ Authorization: `bearer ${token}` })
        .expect(201)

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = response.body

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set({ Authorization: `bearer ${token}` })
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        blogsAtStart.length - 1
      )

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('editing an existing blog', () => {
    test('the ammount of likes can be altered', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToAlter = blogsAtStart[0]
      const alteredBlog = {
        ...blogToAlter,
        likes: blogToAlter.likes + 1
      }
      const resultBlog = await api
        .put(`/api/blogs/${blogToAlter.id}`)
        .send(alteredBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(alteredBlog)
      expect(resultBlog.body.likes).toEqual(alteredBlog.likes)

      const newAlteredBlog = {
        ...alteredBlog,
        likes: alteredBlog.likes - 1
      }

      const newResultBlog = await api
        .put(`/api/blogs/${blogToAlter.id}`)
        .send(newAlteredBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(newResultBlog.body).toEqual(newAlteredBlog)
      expect(newResultBlog.body.likes).toEqual(newAlteredBlog.likes)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length
      )
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})