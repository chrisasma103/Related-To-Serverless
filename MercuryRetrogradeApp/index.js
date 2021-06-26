const fetch = require('node-fetch')
module.exports = async function (context, req) {
    let resp = await fetch("https://mercuryretrogradeapi.com", {
        method: 'GET'
    });
    let retrograde = await resp.json()
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: retrograde
    };
}