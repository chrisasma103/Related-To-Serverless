const morse = require("morse-code-converter");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    var englishwords = req.query.plaintext
    var morsewords = morse.textToMorse(englishwords);
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: morsewords
    };
}