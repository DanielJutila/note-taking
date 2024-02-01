const express = require('express');
const notesRouter = require('./notes.js');

const app = express();
const router = express.Router();

router.get('/', function (req, res) {
  res.send('API homepage');
});

app.use('/api/notes', notesRouter); 

app.use('/', router); 

module.exports = app; 