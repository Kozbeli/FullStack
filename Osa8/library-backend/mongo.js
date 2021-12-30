const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.7ix1s.mongodb.net/books-gql?retryWrites=true&w=majority`

mongoose.connect(url)

// noteSchema
// const noteSchema = new mongoose.Schema({
//   content: String,
//   date: Date,
//   important: Boolean,
// })

// const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'HTML is Easy',
//   date: new Date(),
//   important: true,
// })

// bookSchema
// const bookSchema = new mongoose.Schema({
//   title: String,
//   published: Number,
//   author: String,
//   genres: [String],
// })

// const Book = mongoose.model('Book', bookSchema)

// const book = new Book(
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     id: "afa5de04-344d-11e9-a414-719c6709cf3e",
//     genres: ['classic', 'revolution']
//   },)

// book.save().then(response => {
//   console.log('document saved!')
//   mongoose.connection.close()
// })

const authorSchema = new mongoose.Schema({
  name: String,
  born: Number,
})

const Author = mongoose.model('Author', authorSchema)

const newAuthor = new Author({
  name: 'Sandi Metz',
})

// newAuthor.save().then(response => {
//   console.log('document saved!')
//   mongoose.connection.close()
// })

Author.find({}).then(result => {
  result.forEach(author => {
    console.log(author)
  })
  mongoose.connection.close()
})