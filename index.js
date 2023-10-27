require('dotenv').config()

const express = require('express')
var morgan = require('morgan');

const Person = require('./models/person')

const app = express()
const cors = require('cors')

app.use(cors())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]



morgan.token('body', function getBody(request) {
    return JSON.stringify(request.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const today = new Date();
app.get('/info', (request, response) => {

    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${today}</p>`)
})

/*
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

// add new note



app.post('/api/persons', (request, response) => {

    const person = request.body;
    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'name missing or number are missing'
        })
    }

    else if (persons.find(p => p.name === person.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    else {
        person.id = Math.random() * 1000;
        persons = persons.concat(person)

        response.json(person)
    }

})

if (process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('added', result.name, "number", result.number, "to phonebook")
        mongoose.connection.close()

    })


}

*/
app.use(express.json());

app.use(express.static('build'))


app.get('/api/persons', (request, response) => {

    Person.find({}).then(persons => {
        response.json(persons)
        mongoose.connection.close()
    })


})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




