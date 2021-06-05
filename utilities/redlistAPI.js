require('dotenv').config();

const fetch = require('node-fetch');
const endpoint = 'https://apiv3.iucnredlist.org/api/v3/'
const TOKEN = process.env.REDLIST_TOKEN;

// generate a simplified result object containing desired info from redlist API
function resultObjFromResponse(resp) {
    if(resp.result[0]) {
    return {
        scientific_name: resp.result[0].scientific_name,
        common_name: resp.result[0].main_common_name,
        category: resp.result[0].category,
        population_trend: resp.result[0].population_trend,
        assessment_date: resp.result[0].assessment_date
    }
} else {
    return {category: 'No Data'};
}
    
}

async function globalStatus (speciesName) {
    const url = encodeURI(endpoint + `species/${speciesName}?token=${TOKEN}`);
    const response = await fetch(url);
    if (response.ok) {
    const resp = await response.json();

    
    return resultObjFromResponse(resp);
} else {
    return {};
}

};

async function regionalStatus(speciesName, region) {
    const url = encodeURI(endpoint + `species/${speciesName}/region/${region}?token=${TOKEN}`);
    const response = await fetch(url);
    if(response.ok) {
        const resp = await response.json();
        resultObjFromResponse(resp);
    } else {
        return {};
    }
}

// API functions to get threats and return an array of them.


async function regionalThreats(speciesName, region) {
    const url = encodeURI(endpoint + `threats/species/name/${speciesName}/region/${region}?token=${TOKEN}`)
    const response = await fetch(url);
    if(response.ok) {
        const resp = await response.json();
    // result is an array of threat objects with code, title, timing, scope, severity, score and invasive properties
        return resp.result;
    } else {
        return {};
    }
}

async function globalThreats(speciesName) {
    const url = encodeURI(endpoint + `threats/species/name/${speciesName}?token=${TOKEN}`);
    const response = await fetch(url);
    if(response.ok) {
        const resp = await response.json();
        let uniqueResults = [];
        // remove duplicate entries of threats in results
        resp.result.forEach(threat => {
            if(!uniqueResults.includes(threat)) {
                uniqueResults.push(threat);
            }
        })
        console.log(uniqueResults);
        return uniqueResults;
    } else {
        return {};
    }
}


module.exports = {globalStatus, globalThreats, regionalStatus, regionalThreats};

