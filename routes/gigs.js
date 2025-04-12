const express = require('express');
const router = express.Router();
const database = require('../config/database');
//const Gig = require('../models/Gig');
const Gig = require('../models/Gig');

//router.get('/', (req, res) => res.send('GIGS'));

// router.get('/', (req, res) => Gig.findAll()
// .then(gigs => {
//     console.log(gigs);
//     res.sendStatus(200);
// })
// .catch(err => console.log(err)));

router.get('/', async (req, res) => {
    try {
      const gigs = await Gig.findAll();
      console.log(gigs);
      res.sendStatus(200);
      //res.json(gigs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });

  module.exports = router; 