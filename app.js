const express = require('express');
//const exphbs = require('express-handlebars');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
//const Sequelize = require('sequelize');

// Test DB
// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch(err => console.log('Error: ' + err))

// const app = express();

// app.get('/', (req, res)=> res.send('INDEX'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log('server started on port: ' +PORT));


// const express = require('express');
// const Sequelize = require('sequelize');

const app = express();

// Handlebars
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


// Database configuration
// const db = new Sequelize('postgres', 'postgres', 'postgres', {
//   host: 'localhost',
//   port: 5433,
//   dialect: 'postgres',
//   logging: console.log,
//   retry: { max: 5, timeout: 5000 }
// });

const db = require('./config/database');

// Test DB connection
(async () => {
  try {
    await db.authenticate();
    console.log('Database connected...');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
})();

// Routes
//app.get('/', (req, res) => res.send('INDEX'));

//gigs routes
app.use('/gigs', require('./routes/gigs'))

// Server startup
const PORT = process.env.PORT || 50818;
const server = app.listen(PORT, () => {
  console.log(`Server started on port: ${server.address().port}`);
}).on('error', (err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});

// Clean shutdown handler
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});