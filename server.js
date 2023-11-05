const { randomUUID } = require('crypto');
const express = require('express');
const fs = require('fs');
//const db = require('./db/db.json');
const app = express();
const path = require('path');
const notes = require('express').Router();

const port = 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use(express.static('public'));

//HTML route to link and return index file
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//HTML route to link and return notes file
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET route to retrieve notes
notes.get('/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST request to save new notes 
// notes.post('/notes', (req, res) => {
//     console.info(`${req.method} request received to add a note`);
//     console.log(req.body);
  
//     const { title, text } = req.body;
  
//     if (req.body) {
//       const newNote = {
//         title,
//         text,
//         note_id: uuid(),
//     };
  
//       fs.writeFile(newNote, './db/db.json');
//       res.json(`Task added successfully`);
//     } else {
//       res.error('Error in adding task');
//     }
//   });

notes.post('/notes', (req, res) => {
    console.log(req.body)
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: randomUUID(),
        };
        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json('Error on posting new note');
    }
})

app.listen(port, () => {
    console.log("listening on port 3001");
})