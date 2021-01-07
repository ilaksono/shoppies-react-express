require('dotenv').config();
const app = require('express')();
const PORT = process.env.PORT || 8001;
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const { Pool } = require('pg');
const db = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.use(cors());
app.use(bodyParser.json());

const getURL = (s, y = '', page = 1) =>
  `http://www.omdbapi.com/?s=${s}&y=${y}&page=${page}&type=movie&apikey=${process.env.OMDB_API_KEY}`;

const getAutoURL = (s) =>
  `http://www.omdbapi.com/?s=${s}&r=json&apikey=${process.env.OMDB_API_KEY}`;

app.get('/api/autocomplete', async (req, res) => {
  try {

    const s = req.query.s;

    if (param) {
      const data = await fetch(getAutoURL(s));
      const json = await data.json();
      if (json.Search)
        return res.send(json.Search);
      else
        res.status(400).send('No Data');

    }
  } catch (er) {
    console.log(er);
  }
});

app.post('/api/user', (req, res) => {
  

})

app.get('/api/search', async (req, res) => {
  try {

    const params = [
      ,req.query.s,
      ,req.query.y,
      ,req.query.page
  ];

    if (param) {
      const data = await fetch(getURL(...params));
      const json = await data.json();
      if (json.Search)
        return res.send(json.Search);
      else
        res.status(400).send('No Data');

    }
  } catch (er) {
    console.log(er);
  }

});
app.listen(PORT, () => console.log("listening on ", PORT));