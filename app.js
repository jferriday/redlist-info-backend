const { json } = require('express');
const express = require('express');
const app = express();
const jsonParser = express.json();

const {filterResultsByKindom} = require('./utilities/utilities');

// parse request body as JSON
app.use(jsonParser);

// Set whether request has used binomial or common name
app.param('binomial', (req, res, next, binomial) => {
    if(binomial === true) {
        req.binomial = true;
    } else {
        req.binomial = false;
    }
    next();
})

// attach request body with species name:
app.param('species', (req, res, next, species) => {
    req.name = species;    
})
// Common name to species using GBIF API
const commonToSpecies = async (req, res, next) => {
    if (req.binomial) {
        req.multipleResults = false;
        next();
    }
    const commonName = req.name;
    const endpoint = `https://api.gbif.org/v1/species/search?q=${commonName}&rank=SPECIES`;
    const response = await fetch(endpoint);
    if(response.ok) {
        const jsonResponse = response.json();
        req.results = filterResultsByKindgom(jsonResponse.results, 'Animalia');
        req.multipleResults = true;
        next();
    };
}

app.get('/searchByName', commonToSpecies, (req, res) => {
    // if multiple species names are found, return the array of species names
    // client will then ask user to select correct species for another request, this time binomial
    if (!req.binomial) {
        const multiResults = JSON.stringify(req.results)
        res.status(200).json({
            "multipleResults": true,
            "results": multiResults
        });
    }
    // implement redlist API search

})

