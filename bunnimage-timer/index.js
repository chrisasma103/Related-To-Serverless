var multipart = require("parse-multipart")
const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const { BlobServiceClient } = require("@azure/storage-blob");
const account = "bunnimagestorageacc"
module.exports = async function (context, myTimer) {
    var timeStamp = new Date().toISOString();
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "bunnimagecontainer";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);
    for await (const blob of deletecontainerClient.listBlobsFlat()) {
        context.log('\t', blob.name);
        await deleteBlob(blob.name)
        // access the blob's name and call deleteBlob to delete it!
    }
    context.log("Just deleted your blobs!")
};
async function deleteBlob(filename){
    const blobServiceClient = await BlobServiceClient.fromConnectionString(connectionstring);
    const deletecontainer = "bunnimagecontainer";
    const deletecontainerClient = await blobServiceClient.getContainerClient(deletecontainer);
    const deleteblockBlobClient = deletecontainerClient.getBlockBlobClient(filename);
    const downloadBlockBlobResponse = await deleteblockBlobClient.download(0); // 0 refers to the position of the blob to download
    const blobDeleteResponse = deleteblockBlobClient.delete();
    result = {
        body : {
            deletename: filename,
            success: true
        }
    };
    return result;
}