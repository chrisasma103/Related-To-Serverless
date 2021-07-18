const fetch = require('node-fetch')
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let name1=req.query.name1
    let name2=req.query.name2
    let name3=req.query.name3
    let name4=req.query.name4

    let cat1= await getCat(name1)
    let cat2= await getCat(name2)
    let cat3= await getCat(name3)
    let cat4= await getCat(name4)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            name1: cat1,
            name2: cat2,
            name3: cat3,
            name4: cat4
        }
    };
}
async function getCat(name){
    let resp = await fetch("https://cataas.com/cat/says/"+name, {
        method: 'GET'
    });
    let data = await resp.arrayBuffer()
    return Buffer.from(data).toString('base64')
}