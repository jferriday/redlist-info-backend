const router = require('express').Router();
const fetch = require('node-fetch');


const {filterResultsByKingdom} = require('../utilities/utilities');

// Suggests full species name using GBIF API
// attaches an array of result objects filtered by kindgom to include only animals
const speciesSearch = async (req, res, next) => {
    const searchQuery = req.query.name;
    console.log(`searching for ${searchQuery}`)
    const endpoint = `https://api.gbif.org/v1/species/suggest?q=${searchQuery}`;
    const response = await fetch(endpoint);
    if(response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        req.results = jsonResponse;
        console.log(req.results);
        next();
    };
};

// take the animal objects in in req.results and create an array of species names
// attach these species names as an array to the request
const createSpeciesList = (req, res, next) => {
    req.speciesList = req.results.map(result => {
        return result.species;
    });
    next();
}

router.get('/', speciesSearch, createSpeciesList, (req, res, next) => {
    res.status(200).send(req.speciesList);
});

module.exports = router;