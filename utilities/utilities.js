// filters results from GBIF API by kindom
function filterResultsByKingdom(resultArray, kingdom='Animalia') {
    return resultArray.filter(result => {
        return result.kingdom === kingdom;
    })
}

function multiSpeciesNamesFromResults(results) {
    let names = [];
    results.forEach(element => {
        names.push(element.species);
    });
    return names;
}

module.exports = {
    filterResultsByKingdom
};