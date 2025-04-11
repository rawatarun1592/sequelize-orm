const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const Sequelize = require('sequelize');
//const { noBoolOperatorAliases } = require('sequelize/lib/utils/deprecations');
//const Sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const Sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });
// Option 3: Passing parameters separately (other dialects)
const db = new Sequelize('orm', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  operatorAliases:false,
  //dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
pool: {
    max:5,
    min:0,
    acquire:30000,
    idle:10000
},
});

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app = express();

app.get('/', (req, res)=> res.send('INDEX'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));