const express = require('express');
const fs = require('fs');
const db = require('./db/db.json');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;

//gives notes a unique ID
const { v4: uuidv4 } = require('uuid');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));


//API routes
//GET route to retrieve notes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
      if (err) throw err;
      const dbData = JSON.parse(data);
      const dbNotes = Object.values(dbData);
      res.json(dbNotes);
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
 
//DELETE request to delete existing notes
app.delete('/api/notes/:id', (req, res) => {
    const noteIdToDelete = req.params.id;
    const updateDb = db.filter((note) => note.id !== noteIdToDelete);
    fs.writeFileSync('./db/db.json', JSON.stringify(updateDb));
    res.json(updateDb);
});
  

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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});