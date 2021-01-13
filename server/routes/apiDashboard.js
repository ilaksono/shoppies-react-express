const router = require('express').Router();

module.exports = query => {


  router.get('/summary', async (req, res) => {
    const data = await query.getSummary();
    res.send(data);
  });

  router.get('/pie', async (req, res) => {
    try {
      const data = await query.getPieData();
      res.send(data);
    } catch (er) {
      console.error(er);
    }
  });

  router.get('/data', async (req, res) => {
    const { p } = req.query;
    try {
      const data = await query.getGraphData(p);
      res.send(data);
    } catch (er) {
      console.error(er);
    }
  });

  return router;
}