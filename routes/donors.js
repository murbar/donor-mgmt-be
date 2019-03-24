const express = requires('express');
const router = express.Router();

const queries = require('../data/donorQueries');

router.get('/', async (req, res) => {
  try {
    const donors = await queries.getAll();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// etc, etc

module.exports = router;
