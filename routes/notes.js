const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.post('/api/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile(path.join(__dirname, '../db/notes.json'), 'utf8', (err, data) => {
    if (err) throw err;

    const notes = JSON.parse(data);

    newNote.id = notes.length > 0 ? notes[notes.length - 1].id + 1 : 1;
    notes.push(newNote);

    fs.writeFile(path.join(__dirname, '../db/notes.json'), JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

module.exports = router;