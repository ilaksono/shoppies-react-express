require('dotenv').config();
const app = require('express')();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const { Pool } = require('pg');


const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
db.connect();
const query = require('./queries')(db);
const apiUsers = require('./routes/apiUsers');
const apiMovies = require('./routes/apiMovies')
const apiDashboard = require('./routes/apiDashboard');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', apiUsers(query))
app.use('/api/movies', apiMovies(query, fetch));
app.use('/api/dashboard', apiDashboard(query));


app.listen(PORT, () => console.log("listening on ", PORT));