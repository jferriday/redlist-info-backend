require('dotenv').config();
const router = require('express').Router();
const redlistAPI = require('../utilities/redlistAPI')

const TOKEN = process.env.REDLIST_TOKEN;

router.get('/global/:species', async (req, res,) => {
    const species = req.params.species;
    const assessment = await redlistAPI.globalStatus(species)
    res.send(assessment);
});

router.get('/threats/global/:species', async (req, res) => {
    const species = req.params.species;
    const threats = await redlistAPI.globalThreats(species);
    console.log('Threats:' + threats)
    res.send(threats);

})

router.get('/regional/:region/:species', async (req, res) => {
    const species = req.params.species;
    const region = req.params.region;
    const assessment = await redlistAPI.regionalStatus(species, region);
    res.send(assessment);
});

router.get('/threats/regional/:region/:species', async (req, res) => {
    const species = req.params.species;
    const region = req.params.region;
    const threats =  await redlistAPI.regionalThreats(species, region);
    res.send(threats);
})


module.exports = router;