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

  for (const [key, val] of Object.entries(encoding))
    newStr = replaceAll(newStr, `${key}`, `${val}`);

  return newStr;
};

const getURL = (s, y = '', page = 1) =>
  formatSpaces(
    `http://www.omdbapi.com/?s=${s}&y=${y}&page=${page}&type=movie&apikey=${process.env.OMDB_API_KEY}`

  );

const formatRevenue = (str) => {
  if (str === 'N/A') return 0;
  return Number(str.slice(1).split(',').join(''));
};

const getAutoURL = (s) =>
  `http://www.omdbapi.com/?s=${s}&r=json&apikey=${process.env.OMDB_API_KEY}`;

const detailURL = (i) =>
  `http://www.omdbapi.com/?i=${i}&apikey=${process.env.OMDB_API_KEY}`;

app.get('/api/autocomplete', async (req, res) => {
  try {
    const s = req.query.s;
    if (s) {
      const data = await fetch(getAutoURL(formatSpaces(s)));
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

const formatCountry = (str) =>
  str.split(',')[0];

app.get(`/api/details/:id`, async (req, res) => {

  try {
    const response = await fetch(`https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movie-details&imdb=${req.params.id}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": process.env.IMDB_API_KEY,
        "x-rapidapi-host": process.env.RAPID_HOST
      }
    });
    const responseJson = await response.json();
    const data = await fetch(detailURL(req.params.id));
    const dataJson = await data.json();
    const db = await query.getNomsForMovie(req.params.id);
    res.json({ yt: responseJson['youtube_trailer_key'], omdb: dataJson, db });
  } catch (er) {
    console.error(er);
  }

});

app.get('/api/dashboard/summary', async (req, res) => {
  const data = await query.getSummary();
  res.send(data);
});

app.post('/api/nominate', async (req, res) => {
  const {
    user_id,
    Title,
    Year,
    imdbID
  } = req.body;
  let extraData;
  try {
    const extra = await fetch(detailURL(imdbID));
    const extraJson = await extra.json();
    extraData = {
      country: formatCountry(extraJson.Country),
      revenue_usd: formatRevenue(extraJson.BoxOffice)
    };

  } catch (er) {
    return console.error(er);
  }
  try {
    const data = await query
      .updateNominate(user_id, Title, Year, imdbID, extraData);
    res.send(data);

  } catch (er) {
    console.log(er);
  }

});

app.get('/api/dashboard/pie', async (req, res) => {
  try {
    const data = await query.getPieData();
    res.send(data);
  } catch (er) {
    console.error(er);
  }
});

app.get('/api/dashboard/data', async (req, res) => {
  const { p } = req.query;
  try {
    const data = await query.getGraphData(p);
    res.send(data);
  } catch (er) {
    console.error(er);
  }
});

app.post('/api/users', async (req, res) => {
  const {
    email,
    username
  } = req.body;

  try {

    if (username) {
      const data = await query.authoriseReg(email, username);
      return res.send(data);
    } else {
      const data = await query.authoriseLog(email);
      if (!data[0]) return res.send(null);
      const noms = await query
        .getNomsOfUser(data[0].id);
      return res.json({ ...data[0], noms });
    }
  } catch (er) {
    console.log(er);
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const data = await query
      .loadUser(Number(req.params.id));
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
    if (params.length) {

      const data = await fetch(getURL(...params));
      const json = await data.json();
      if (json.Search)
        return res.send(json);
      else
        res.send('No Data');

    }
  } catch (er) {
    console.log(er);
    res.send(er);
  }

});
app.listen(PORT, () => console.log("listening on ", PORT));