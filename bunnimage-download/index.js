const fetch = require('node-fetch');
module.exports = async function (context, req) {
    var username = req.headers['username'];
    context.log(username)
    var download = ""
    var downloadpng = "https://bunnimagestorageacc.blob.core.windows.net/bunnimagecontainer/" + username + ".png";
    var downloadjpeg = "https://bunnimagestorageacc.blob.core.windows.net/bunnimagecontainer/" + username + ".jpeg";
    var downloadjpg = "https://bunnimagestorageacc.blob.core.windows.net/bunnimagecontainer/" + username + ".jpg";
    let pngresp = await fetch(downloadpng, {
        method: 'GET',
     })
    let pngdata = await pngresp;
     
    let jpgresp = await fetch(downloadjpg, {
        method: 'GET',
    })
    let jpgdata = await jpgresp;
    let jpegresp = await fetch(downloadjpeg, {
        method: 'GET',
     })
     let jpegdata = await jpegresp;
     if (pngdata.statusText == "The specified blob does not exist." && jpgdata.statusText == "The specified blob does not exist." && jpegdata.statusText == "The specified blob does not exist.") {
        success = false;
        context.log("Does not exist: " + pngdata)
        context.log("Does not exist: " + jpgdata)
        context.log("Does not exist: " + jpegdata)
     } else if (pngdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadpng
        context.log("Does exist: " + pngdata)
     } else if (jpgdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadjpg
        context.log("Does exist: " + jpgdata)
    } else if (jpegdata.statusText != "The specified blob does not exist.") {
        success = true;
        download = downloadjpeg
        context.log("Does exist: " + jpegdata)
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