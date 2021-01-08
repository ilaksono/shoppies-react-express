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
const query = require('./queries')(db);
app.use(cors());
app.use(bodyParser.json());

const encoding = {
  '%': '%25',
  ' ': '%20',
  '!': '%21',
  '"': '%22',
  '#': '%23',
  '$': '%24',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '*': '%2A',
  '+': '%2B',
  ',': '%2C',
  '-': '%2D',
  ';': '%3B'
};
const replaceAll = (str, search, replace) => {
  return str.split(search).join(replace);

};
const formatSpaces = (str) => {
  let newStr = str;

  for (const [key, val] of Object.entries(encoding)) {
    console.log(typeof key, typeof val);
    console.log(newStr);
    newStr = replaceAll(newStr, `${key}`, `${val}`);
  }

  return newStr;
};

const getURL = (s, y = '', page = 1) =>
  formatSpaces(
    `http://www.omdbapi.com/?s=${s}&y=${y}&page=${page}&type=movie&apikey=${process.env.OMDB_API_KEY}`

  );

const getAutoURL = (s) =>
  formatSpaces(
    `http://www.omdbapi.com/?s=${s}&r=json&apikey=${process.env.OMDB_API_KEY}`);

app.get('/api/autocomplete', async (req, res) => {
  try {

    const s = req.query.s;

    if (s) {
      const data = await fetch(getAutoURL(s));
      const json = await data.json();
      if (json.Search)
        return res.send(json.Search.slice(0, Math.min(5, json.Search.length)));
      else
        return res.send(json);
    }
  } catch (er) {
    console.log(er);
    return res.send(er);
  }
});

app.post('/api/users', async (req, res) => {

  try {
    const {
      email,
      username
    } = req.body;

    if (username) {
      const data = await query.authoriseReg(email, username);
      return res.send(data);
    } else {
      const data = await query.authoriseLog(email);
      if (!data[0]) return res.send(data);
      const noms = await query
        .getNomsOfUser(data[0].id);
      return res.send({ ...data[0], noms });
    }
  } catch (er) {
    console.log(er);
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const data = await query.loadUser(Number(req.params.id));
    res.send(data);
  } catch (er) {
    console.log(er);
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const params = [
      req.query.s,
      req.query.y,
      req.query.page
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