const querystring = require('querystring');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    const queryObject = querystring.parse(req.body);

    let resp = await fetch(queryObject.MediaUrl0,{
        method: 'GET',
    })

    let data = await resp.arrayBuffer()
    var result = await analyzeImage(data);
    let age = result[0].faceAttributes.age
    context.log(age)
    let generation = genDetermine(age)
    context.log(generation)
    const songs = {"GenZ":"https://open.spotify.com/track/0SIAFU49FFHwR3QnT5Jx0k?si=1c12067c9f2b4fbf", 
"GenY":"https://open.spotify.com/track/1Je1IMUlBXcx1Fz0WE7oPT?si=a04bbdf6ec4948b9", 
"GenX":"https://open.spotify.com/track/4Zau4QvgyxWiWQ5KQrwL43?si=790d9e3ef2ed408d", 
"BabyBoomers":"https://open.spotify.com/track/4gphxUgq0JSFv2BCLhNDiE?si=1abb329f2dc24f50", 
"Unknown":"https://open.spotify.com/track/5ygDXis42ncn6kYG14lEVG?si=84b49b41d09d4d11"}
    let link = songs[generation]
    let string = `We guessed you're part of this generation: ${generation}! Happy listening! ${link}`

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: string
    };
}

async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY1;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'
    })
    let resp = await fetch(uriBase + '?' + params.toString(), {
        method: 'POST',
        body: img,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    })
    let emotionData = await resp.json()
    return emotionData;
}

function genDetermine(age){
    let id;
    if (age >= 5 && age < 25) {
        id = "GenZ"
    }
    else if (age >= 25 && age <= 41) {
        id = "GenY"
    }
    else if (age >= 42 && age <= 57) {
        id = "GenX"
    }
    else if (age >= 58 && age <= 76) {
        id = "BabyBoomers"
    }
    else{
        id = "Unknown"
    }
    return id
}