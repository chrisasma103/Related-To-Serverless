const fetch = require('node-fetch')
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let resp = await fetch("https://251a9d93-8c22-472d-b5c5-c0b013b15125.mock.pstmn.io/bitproject", {
        method: 'GET'
    });
    
    let data = await resp.arrayBuffer()
    // we need to receive it as a buffer since this is an image we are receiving from the API
    // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}