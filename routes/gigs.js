const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


// In your route handler (Node.js/Express)
router.get('/', async (req, res) => {
  try {
    const gigs = await Gig.findAll({ raw: true });
    res.render('gigs', { gigs: gigs || [] });
  } catch (err) {
    res.render('gigs', { gigs: [] });
  }
});
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
  if(!budget) {
    errors.push({ text: 'Please add some budget' });
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
router.get('/search', async (req, res) => {
  try {
    const { term } = req.query;
    
    if (!term) {
      return res.redirect('/gigs');
    }

    const gigs = await Gig.findAll({ 
      where: { 
        technologies: { 
          [Op.iLike]: `%${term}%`  // Using iLike for case-insensitive search
        } 
      },
      raw: true  // Important for Handlebars
    });

    res.render('gigs', { 
      gigs,
      searchTerm: term  // Passing search term back to template
    });
  } catch (err) {
    console.error('Search error:', err);
    res.render('error', { error: err });
  }
});

// Delete a gig
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Gig.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      return res.status(200).json({ success: true });
    }
    
    throw new Error('Gig not found');
  } catch (err) {
    console.error('Delete error:', err);
    return res.status(500).json({ 
      success: false,
      error: 'Error deleting gig'
    });
  }
});

module.exports = router;