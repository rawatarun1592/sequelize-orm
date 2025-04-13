const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const path = require('path');

// Database
const db = require('./config/database');

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// Gig routes
app.use('/gigs', require('./routes/gigs'));
const PORT = process.env.PORT || 50818;
app.listen(PORT, console.log(`Server started on port ${PORT}`));