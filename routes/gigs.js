const express = require('express');
const router = express.Router();
const database = require('../config/database');
const Gig = require('../models/Gig');

//router.get('/', (req, res) => res.send('GIGS'));

// router.get('/', (req, res) => Gig.findAll()
// .then(gigs => {
//     console.log(gigs);
//     res.sendStatus(200);
// })
// .catch(err => console.log(err)));

// Get gig list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => res.render('error', {error: err})));

// //get gig list
// router.get('/', async (req, res) => {
//     try {
//       const gigs = await Gig.findAll();
//       console.log(gigs);
//       res.sendStatus(200);
//       //res.json(gigs);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Server error' });
//     }
//   });

  //Add a gig
  // router.get('/add', (req, res) => {
  //   const data = {
  //     title: "Looking for a node js developer",
  //     technologies: "react, javaScripts, nodeJs",
  //     budget: '$3000',
  //     description: 'In this tutorial, you will learn to make a simple setup of Sequelize.',
  //     contact_email: 'user1@gmail.com'
  //   }

  //   let {title, technologies, budget, description, contact_email} = data;

  //   //Insert into table
  //   Gig.create({
  //     title,
  //     technologies,
  //     budget,
  //     description,contact_email
  //   })
  //   .then(gig => res.redirect('/gigs'))
  //   .catch(err => console.log(err));

  // });

  router.get('/add', async (req, res) => {
    try {
      const gigData = {
        title: "Looking for a Node.js developer",
        technologies: "React, JavaScript, Node.js",
        budget: '$3000',
        description: 'In this tutorial, you will learn to make a simple setup of Sequelize.',
        contact_email: 'user1@gmail.com'
      };
  
      await Gig.create(gigData);
      res.redirect('/gigs');
    } catch (err) {
      console.error('Error creating gig:', err);
      res.status(500).send('Error creating gig');
    }
  });

  module.exports = router; 