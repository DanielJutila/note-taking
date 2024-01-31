const router = require('express').Router();

const notesRouter = require('./notes');

router.use('/tips', notesRouter);

module.exports = router;