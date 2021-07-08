const fetch = require('node-fetch');

module.exports = async function (context, req) {
    var username = req.headers['username'];
    var download = ""
    var downloadpng = "https://bunnimagestorageacc.blob.core.windows.net/bunnimagecontainer/" + username + ".png";
    var downloadjpeg = "https://bunnimagestorageacc.blob.core.windows.net/bunnimagecontainer/" + username + ".jpeg";
    let pngresp = await fetch(downloadpng, {
        method: 'GET',
     })
     let pngdata = await pngresp;
     
     let jpgresp = await fetch(downloadjpg, {
        method: 'GET',
     })
     let jpgdata = await jpgresp;

     if (pngdata.statusText == "The specified blob does not exist." && jpgdata.statusText == "The specified blob does not exist." ) {
        success = false;
        context.log("Does not exist: " + pngdata)
        context.log("Does not exist: " + jpgdata)
     } else if (pngdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadpng
        context.log("Does exist: " + pngdata)
     } else if (jpgdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadjpg
        context.log("Does exist: " + jpgdata)
     }
     context.res = {
        body: {
                 "downloadUri" : download,
                 "success": success,
        }
    };
    context.log(download);
    context.done();
}