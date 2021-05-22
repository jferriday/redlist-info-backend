require('dotenv').config();
const router = require('express').Router();
const redlistAPI = require('../utilities/redlistAPI')

const TOKEN = process.env.REDLIST_TOKEN;

router.get('/global/:species', async (req, res, next) => {
    const species = req.params.species;
    const assessment = await redlistAPI.globalStatus(species)
    res.send(assessment);
});

module.exports = router;