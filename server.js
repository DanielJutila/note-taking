const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const { v4: uuidv4 } = require('uuid');

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/notes.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes' });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.delete('/api/notes', (req, res) => {
  
})

app.post('/api/notes', (req, res) => {

  const newNote = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  
  fs.readFile(path.join(__dirname, './db/notes.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to read notes' });
    } else {
      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile(path.join(__dirname, './db/notes.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Failed to save note' });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});
