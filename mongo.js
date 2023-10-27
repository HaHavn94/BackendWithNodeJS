const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://havu:${password}@mongostudy.aaoi4w8.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: "HA",
    number: "123"
})

/*
note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})