var multipart = require('parse-multipart');

module.exports = async function (context, req) {
    var boundary = multipart.getBoundary(req.headers['content-type']);
  
    var body = req.body

    var parts = multipart.Parse(body, boundary);

    var imageData = parts[0].data
    var convertedResult = Buffer.from(imageData).toString('base64');
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: convertedResult
    };
}