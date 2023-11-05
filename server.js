const express = require('express');
const fs = require('fs');
//const db = require('./db/db.json');
const app = express();
const path = require('path');

const port = 3001;

//gives notes a unique ID
const { v4: uuidv4 } = require('uuid');
uuidv4(); 


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//HTML ROUTES
//HTML route to link and return index file
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

//HTML route to link and return notes file
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

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
})
//POST request to save new notes 
app.post('/api/notes', (req, res) => {
    if (req.body) {
       const newNote = {
         title,
         text,
         note_id: uuidv4(),
     };
  
     fs.writeFile(newNote, './db/db.json');
      res.json(`Task added successfully`);
     } else {
          res.error('Error in adding task');
   }
   });

// notes.post('/notes', (req, res) => {
//     console.log(req.body)
//     const { title, text } = req.body;

//     if (title && text) {
//         const newNote = {
//             title,
//             text,
//             note_id: randomUUID(),
//         };
//         const response = {
//             status: 'success',
//             body: newNote,
//         };
//         res.json(response);
//     } else {
//         res.json('Error on posting new note');
//     }
// })

// app.post('/api/notes', (req, res) => {
 
//     const newNote = req.body;
  
//     newNote.id = uuidv4()

//     db.push(newNote)

//     fs.writeFileSync('./db/db.json', JSON(db))

//     res.json(db)
//})


app.listen(port, () => {
    console.log("listening on port 3001");
})