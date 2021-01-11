const pLookup = {
  "votes": function (db) {
    const qs = `
    SELECT COUNT(*) as total, movie_id, 
    movies.title, movies.revenue_usd, movies.country
    FROM nominations JOIN movies 
    ON movies.imdbID = nominations.movie_id
    GROUP BY movie_id, movies.title, 
    movies.revenue_usd, movies.country
    ORDER BY total DESC
    LIMIT 5;`;
    return db.query(qs, [])
      .then(res => res.rows
      );
  },
  "revenueD": function (db) {
    const qs = `
     SELECT COUNT(*) as total, movie_id, 
    movies.title, movies.revenue_usd, movies.country 
    FROM nominations JOIN movies 
    ON movies.imdbID = nominations.movie_id
    GROUP BY movie_id, movies.title, 
    movies.revenue_usd, movies.country
    ORDER BY movies.revenue_usd DESC
    LIMIT 5;`;
    return db.query(qs, [])
      .then(res => res.rows);
  },
  "revenueA": function (db) {
    const qs = `
     SELECT COUNT(*) as total, movie_id, 
    movies.title, movies.revenue_usd, movies.country 
    FROM nominations JOIN movies 
    ON movies.imdbID = nominations.movie_id
    GROUP BY movie_id, movies.title, 
    movies.revenue_usd, movies.country
    ORDER BY movies.revenue_usd ASC
    LIMIT 5;`;
    return db.query(qs, [])
      .then(res => res.rows);
  }
};

module.exports = (db) => {
  const authoriseReg = async (email, username) => {

    const qsCheck = `
    SELECT * from users
    WHERE email = $1
    ;`;
    try {
      const valid = await db
        .query(qsCheck, [email.toLowerCase()]);
      if (valid.rows[0])
        return null;
      const qsInsert = `
      INSERT INTO users (email, username)
      VALUES ($1, $2)
      RETURNING *;`;
      return db
        .query(qsInsert, [email, username])
        .then(res => res.rows);
    } catch (er) {
      console.error(er);
      return null;
    }
  };

  const authoriseLog = (email) => {
    const qs = `
    SELECT * FROM users WHERE email = $1;`;
    return db
      .query(qs, [email])
      .then(res => res.rows);
  };

  const loadUser = async (id) => {
    const qs = `
    SELECT * FROM users where id = $1;`;
    const user = await db.query(qs, [Number(id)]);

    return getNomsOfUser(id)
      .then(res => ({
        noms: res,
        user: user.rows[0]
      }));
  };

  const getNomsOfUser = id => {
    const qs = `
    SELECT nominations.*, movies.title, 
    movies.year, movies.imdbID as imdbID
    FROM nominations
    JOIN movies ON movie_id = movies.imdbID 
    WHERE user_id = $1;`;
    return db
      .query(qs, [Number(id)])
      .then(res => res.rows);
  };

  const getNomsForMovie = async (imdbID) => {
    const qs1 = `
    SELECT * FROM movies WHERE imdbID = $1;`;
    let data;
    try {
      data = await db.query(qs1, [imdbID]);
    } catch (er) {
      console.error(er);
      return 0;
    }
    if (!data.rows.length)
      return 0;
    data = data.rows[0];
    let nom;
    try {
      const qs2 = `
      SELECT COUNT(*) as num_nom FROM nominations 
      WHERE movie_id = $1;`;

      nom = await db.query(qs2, [imdbID]);
      if (!nom.rows[0]) return 0;
      return nom.rows[0].num_nom;
    } catch (er) {
      console.error(er);
    }
  };

  const insertNomination = (user_id, movie_id) => {
    const qs = `
    INSERT INTO nominations(user_id, movie_id)
    VALUES($1, $2);`;
    return db.query(qs, [user_id, movie_id])
      .then(res => res.rows);
  };

  const deleteNomination = (user_id, movie_id) => {
    const qs = `
    DELETE FROM nominations
    WHERE user_id = $1 AND movie_id = $2;`;

    return db.query(qs, [user_id, movie_id])
      .then(res => res.rows);
  };

  const updateNominate = async (user_id, title, year, imdbID, extraData) => {
    const insertQs = `
    INSERT INTO movies (title, year, 
      imdbID, country, revenue_usd)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    ;`;
    let data;
    try {
      data = await db
        .query(insertQs, [title, year, imdbID,
          extraData.country, extraData.revenue_usd]);

    } catch (er) {
      console.error(er);
      const getQs = `
        SELECT * FROM movies WHERE imdbID = $1;`;
      data = await db.query(getQs, [imdbID]);
    }
    data = data.rows[0];
    const getNomQs = `
    SELECT * FROM nominations 
    WHERE user_id = $1 AND movie_id = $2;`;
    let nomData;
    try {
      nomData = await db
        .query(getNomQs, [user_id, imdbID]);
      if (!nomData.rows.length)
        await insertNomination(user_id, imdbID);
      else await deleteNomination(user_id, imdbID);
      return data;
    } catch (er) {

      console.error(er);
    }
  };

  const getSummaryNumUsr = () => {
    const qs = `
    SELECT COUNT(*) as num_usr 
    FROM users;
    `;
    return db.query(qs, [])
      .then(res => res.rows);

  };
  const getSummaryNumVotes = () => {
    const qs = `
    SELECT COUNT(*) as num_vot 
    FROM nominations;
    `;
    return db.query(qs, [])
      .then(res => res.rows);

  };
  const getSummaryNumMovies = () => {
    const qs = `
    SELECT COUNT(*) as num_mov 
    FROM movies;
    `;
    return db.query(qs, [])
      .then(res => res.rows);
  };
  const getSummary = async () => {
    const data1 = await getSummaryNumUsr();
    const data2 = await getSummaryNumVotes();
    const data3 = await getSummaryNumMovies();
    return {
      num_usr: data1[0].num_usr || 0,
      num_vot: data2[0].num_vot || 0,
      num_mov: data3[0].num_mov || 0
    };
  };
  const getGraphData = (p) => {
    return pLookup[p](db);
  };

  const getPieData = () => {
    const qs = `
    SELECT COUNT(movies.country) as count, country FROM nominations
    JOIN movies ON movie_id = movies.imdbID
    GROUP BY movies.country
    ORDER BY count DESC
    LIMIT 6;    
    `;
    return db.query(qs)
      .then(res => res.rows);
  };

  return {
    authoriseReg,
    authoriseLog,
    loadUser,
    getNomsOfUser,
    updateNominate,
    getNomsForMovie,
    getSummary,
    getGraphData,
    getPieData
  };
};
