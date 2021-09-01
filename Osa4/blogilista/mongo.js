const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.7ix1s.mongodb.net/blog-list-test?retryWrites=true&w=majority`

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  id: 3,
  author: "Matti Meikäläinen",
  title: "Minun blogini",
  url: "https://www.iltasanomat.fi",
  votes: 5
})

blog.save().then(response => {
  console.log('blog saved!')
  mongoose.connection.close()
})

Blog.find({}).then(result => {
  result.forEach(blog => {

    console.log(blog)
  })
  mongoose.connection.close()
})