require('dotenv').config();

const fetch = require('node-fetch');
const endpoint = 'https://apiv3.iucnredlist.org/api/v3/'
const TOKEN = process.env.REDLIST_TOKEN;


async function globalStatus (speciesName) {
    const url = encodeURI(endpoint + `species/${speciesName}?token=${TOKEN}`);
    const response = await fetch(url);
    if (response.ok) {
    const resp = await response.json();

    const result = {
        scientific_name: resp.result[0].scientific_name,
        common_name: resp.result[0].main_common_name,
        category: resp.result[0].category,
        population_trend: resp.result[0].population_trend,
        assessment_date: resp.result[0].assessment_date
    }
    console.log(result);
    return result;
} else {
    return {};
}

};

module.exports = {globalStatus};

