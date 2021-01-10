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
      return null
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
      return nom.rows;
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

  const updateNominate = async (user_id, title, year, imdbID) => {
    const insertQs = `
    INSERT INTO movies (title, year, imdbID)
    VALUES ($1, $2, $3)
    RETURNING *
    ;`;
    let data;
    try {
      data = await db
        .query(insertQs, [title, year, imdbID]);
    } catch (er) {
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


  return {
    authoriseReg,
    authoriseLog,
    loadUser,
    getNomsOfUser,
    updateNominate,
    getNomsForMovie
  };
};
