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

  return {
    authoriseReg,
    authoriseLog,
    loadUser,
    getNomsOfUser
  };
};
