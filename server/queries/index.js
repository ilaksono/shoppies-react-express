module.exports = (db) => {
  const authoriseReg = async (email, username) => {

    const qsCheck = `
    SELECT * from users
    WHERE email = $1
    ;`;

    const valid = await db
      .query(qsCheck, [email.toLowerCase()]);
    if (valid.rows[0])
      return 0;
    const qsInsert = `
    INSERT INTO users (email, username)
    VALUES ($1, $2)
    RETURNING *;`;
    return db
      .query(qsInsert, [email, username])
      .then(res => res.rows);
  };

  const authoriseLog = (email) => {
    const qs = `
    SELECT * FROM users where email = $1;`;
    return db
      .query(qs, [email])
      .then(res => res.rows);
  };

  const loadUser = async id => {
    const qs = `
    SELECT * FROM users where id = $1;`;
    const user = await db.query(qs, [id]);

    return getNomsOfUser(id)
      .then(res => ({
        noms: res.rows,
        user: user.rows[0]
      }));
  };

  const getNomsOfUser = id => {
    const qs = `
    SELECT * FROM nominations WHERE users_id = $1;`;
    return db
      .query(qs, [id])
      .then(res => res.rows);

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
        .query(getNomQs, [user_id, data.id]);
      if (!nomData.rows.length)
        await insertNomination(user_id, data.id);
      else await deleteNomination(user_id, data.id);
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
    updateNominate
  };
};
