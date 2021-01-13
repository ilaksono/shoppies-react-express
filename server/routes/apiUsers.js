const router = require('express').Router();

module.exports = (query) => {


  router.post('/', async (req, res) => {
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

  router.get('/:id', async (req, res) => {
    try {
      const data = await query
        .loadUser(Number(req.params.id));
      res.send(data);
    } catch (er) {
      console.log(er);
    }
  });
  return router;
};