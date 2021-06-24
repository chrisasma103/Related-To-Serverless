const fetch = require('node-fetch')
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let resp1 = await fetch("https://cataas.com/cat/says/serverless", {
        method: 'GET'
    });
    let firstdata = await resp1.arrayBuffer()

    let resp2 = await fetch("https://cataas.com/cat/says/serverless", {
        method: 'GET'
    });
    let seconddata = await resp2.arrayBuffer()
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob
    var cat1 = Buffer.from(firstdata).toString('base64')
    var cat2 = Buffer.from(seconddata).toString('base64')

    var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
    var name1= names[Math.floor(names.length * Math.random())]
    var name2= names[Math.floor(names.length * Math.random())]
    context.res = {
        // status: 200, /* Defaults to 200 */
        body:{"cat1": cat1,
                "cat2": cat2,
            names: [name1, name2]}
    };
}