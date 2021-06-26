const piglatin = require('pig-latin')
const Joke = require('awesome-dev-jokes')

function replaceChar(input){
    const re = new RegExp("\"")
    return input.replace('\"', '')
}

module.exports = async function (context, req) {
    const plainjoke1 = Joke.getRandomJoke()
    const plainjoke2 = replaceChar(plainjoke1)
    context.log(plainjoke1)
    context.log(plainjoke2.split())
    const pljoke = piglatin(plainjoke2)
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {plainjoke2, pljoke}
    };
}