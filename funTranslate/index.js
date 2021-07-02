const fetch = require('node-fetch')
const querystring = require('querystring');

module.exports = async function (context, req) {
    let text = querystring.escape(req.query.text)
    let resp = await fetch("https://api.funtranslations.com/translate/shakespeare.json?", {
        method: 'POST',
        body: JSON.stringify({text: text})
    });
    let response = await resp.json()
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: response.contents.translated
    };
}