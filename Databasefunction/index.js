var multipart = require("parse-multipart")
const fetch = require('node-fetch');
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");
const account = "databasecontainer"
module.exports = async function (context, myTimer) {
    status="success"

    try {
        let resp1 = await fetch("https://cataas.com/cat", {
            method: 'GET'
        });
        var catarray = await resp1.arrayBuffer()
    }
    catch(error){
        context.log(`error1: ${error}`)
        status="failure"
        context.res = {
            status: status
        }
        return
    }
    try{
    var cat = Buffer.from(catarray).toString('base64')
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerName = "databasecontainer";
    const containerClient = blobServiceClient.getContainerClient(containerName);    // Get a reference to a container
    const blobName = "catpicture.png";    // Create the container
    const blockBlobClient = containerClient.getBlockBlobClient(blobName); // Get a block blob client
    var uploadBlobResponse = await blockBlobClient.upload(cat, cat.length);
    }
    catch(error){
        context.log(`error2: ${error}`)
        status="failure"
        context.res = {
            status: status
        }
        return
    }
    context.log(`success: ${uploadBlobResponse}`)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: status
    }
}

