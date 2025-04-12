// const express = require('express');
// const router = express.Router();
// const database = require('../config/database');
// const Gig = require('../models/Gig');
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

// //router.get('/', (req, res) => res.send('GIGS'));

// // router.get('/', (req, res) => Gig.findAll()
// // .then(gigs => {
// //     console.log(gigs);
// //     res.sendStatus(200);
// // })
// // .catch(err => console.log(err)));

// // Get gig list
// router.get('/', (req, res) => 
//   Gig.findAll()
//     .then(gigs => res.render('gigs', {
//         gigs
//       }))
//     .catch(err => res.render('error', {error: err})));

// // //get gig list
// // router.get('/', async (req, res) => {
// //     try {
// //       const gigs = await Gig.findAll();
// //       console.log(gigs);
// //       res.sendStatus(200);
// //       //res.json(gigs);
// //     } catch (err) {
// //       console.error(err);
// //       res.status(500).json({ error: 'Server error' });
// //     }
// //   });

// // Display add gig form
// router.get('/add', (req, res) => res.render('add'));

//   //Add a gig
//   router.post('/add', (req, res) => {
//     // const data = {
//     //   title: 'Looking for a node js developer',
//     //   description: 'In this tutorial, you will learn to make a simple setup of Sequelize.',
//     //   budget: '$3000',
//     //   contact_email: 'user1@gmail.com',
//     //   technologies: 'react, javaScripts, nodeJs'
//     // }

//     let {title, description, budget, contact_email, technologies} = req.body;
//     let errors = [];

//     // Validate Fields
//     if(!title) {
//       errors.push({ text: 'Please add a title' });
//     }
//     if(!technologies) {
//       errors.push({ text: 'Please add some technologies' });
//     }
//     if(!description) {
//       errors.push({ text: 'Please add a description' });
//     }
//     if(!contact_email) {
//       errors.push({ text: 'Please add a contact email' });
//     }

//       // Check for errors
//   if(errors.length > 0) {
//     res.render('add', {
//       errors,
//       title, 
//       technologies, 
//       budget, 
//       description, 
//       contact_email
//     });
//   } else {
//     if(!budget) {
//       budget = 'Unknown';
//     } else {
//       budget = `$${budget}`;
//     }

//     // Make lowercase and remove space after comma
//     technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

//     // Insert into table
//     Gig.create({
//       title,
//       technologies,
//       description,
//       budget,
//       contact_email
//     })
//       .then(gig => res.redirect('/gigs'))
//       .catch(err => res.render('error', {error:err.message}))
//   }
// });

// // Search for gigs
// router.get('/search', (req, res) => {
//   let { term } = req.query;

//   // Make lowercase
//   term = term.toLowerCase();

//   Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
//     .then(gigs => res.render('gigs', { gigs }))
//     .catch(err => res.render('error', {error: err}));
// });

//   // router.get('/add', async (req, res) => {
//   //   try {
//   //     const gigData = {
//   //       title: "Looking for a Node.js developer",
//   //       technologies: "React, JavaScript, Node.js",
//   //       budget: '$3000',
//   //       description: 'In this tutorial, you will learn to make a simple setup of Sequelize.',
//   //       contact_email: 'user1@gmail.com'
//   //     };
  
//   //     await Gig.create(gigData);
//   //     res.redirect('/gigs');
//   //   } catch (err) {
//   //     console.error('Error creating gig:', err);
//   //     res.status(500).send('Error creating gig');
//   //   }
//   // });

//   module.exports = router; 

const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get gig list
router.get('/', (req, res) => 
  Gig.findAll()
    .then(gigs => res.render('gigs', {
        gigs
      }))
    .catch(err => res.render('error', {error: err})));

// Display add gig form
router.get('/add', (req, res) => res.render('add'));

// Add a gig
router.post('/add', (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if(!title) {
    errors.push({ text: 'Please add a title' });
  }
  if(!technologies) {
    errors.push({ text: 'Please add some technologies' });
  }
  if(!description) {
    errors.push({ text: 'Please add a description' });
  }
  if(!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if(errors.length > 0) {
    res.render('add', {
      errors,
      title, 
      technologies, 
      budget, 
      description, 
      contact_email
    });
  } else {
    if(!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    // Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ',');

    // Insert into table
    Gig.create({
      title,
      technologies,
      description,
      budget,
      contact_email
    })
      .then(gig => res.redirect('/gigs'))
      .catch(err => res.render('error', {error:err.message}))
  }
});

// Search for gigs
router.get('/search', (req, res) => {
  let { term } = req.query;

  // Make lowercase
  term = term.toLowerCase();

  Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%' } } })
    .then(gigs => res.render('gigs', { gigs }))
    .catch(err => res.render('error', {error: err}));
});

module.exports = router;