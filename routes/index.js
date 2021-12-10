const router = require('express').Router();

//Import api routes, add prefix to all routes imported from /api
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
});

module.exports = router;
  