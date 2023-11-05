const express = require('express');
const fs = require('fs');
const db = require('./db/db.json');
const app = express();
const path = require('path');
//const bodyParser = require("body-parser");;

const PORT = process.env.PORT || 3001;

//gives notes a unique ID
const { v4: uuidv4 } = require('uuid');


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
//app.use(bodyParser.json());

//HTML ROUTES
//HTML route to link and return index file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//HTML route to link and return notes file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

//Wildcard route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

//API routes
//GET route to retrieve notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        var dbNote = JSON.parse(data);
        res.json(dbNote);
  });
});

//POST request to save new notes 
app.post('/api/notes', (req, res) => {
 
    const newNote = req.body;
  
    newNote.id = uuidv4();

    db.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(db));

    res.json(db);
});

app.delete('/api/notes/:id', (req, res) =>{
    const updateDb = db.filter((note) =>
    note.id !== req.params.id);
    fs.writeFileSync('./db/db.json', JSON.stringify(updateDb));
    readFile.json(updateDb);
});


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});