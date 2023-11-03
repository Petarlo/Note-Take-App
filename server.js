const express = require('express');
const db = require('./db/db.json')
const app = express()
const api = require()

const port = 3001

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.json(db)
})

app.get('/notes', (req, res) => {
    res.sendFile('/Users/peta_/bootcamp/Note-Taker-App/public/notes.html')
})

app.post('/notes', (req, res) => {

})

app.listen(port, () => {
    console.log("listening on port 3001");
})