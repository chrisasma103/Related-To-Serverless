const CosmosClient = require("@azure/cosmos").CosmosClient;
const querystring = require('querystring');
const config = {
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
    databaseId: "SecretStorer",
    containerId: "secrets",
    partitionKey: {kind: "Hash", paths: ["/secrets"]}
};

module.exports = async function (context, req) {
    const queryObject = querystring.parse(req.body);
    let message = queryObject.Body;
    let document = {"message" : message}
    let items = await createDocument(document)
    var random_value = Math.floor(items.length * Math.random());
    context.log(message)
    context.log(JSON.stringify(items[random_value].message))
    const responseMessage = `Thanks 😊! Stored your secret "${message}". 😯 Someone confessed that: ${JSON.stringify(items[random_value].message)}`;
}

async function create(client) {     
    // make database
    const { database } = await client.databases.createIfNotExists({
    id: config.databaseId
    });
    // make container
    const { container } = await client
    .database(config.databaseId)
    .containers.createIfNotExists(
    { id: config.containerId, key: config.partitionKey },
    { offerThroughput: 400 }
    );
}

async function createDocument(newItem) {
    var { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({endpoint, key});
    const database = client.database(databaseId);
    const container = database.container(containerId);
    await create(client, databaseId, containerId);

    const querySpec = {
        query: "SELECT * from c"
    };
    const {resources: items} = await container.items.query(querySpec).fetchAll();
    const {resource: createdItem} = await container.items.create(newItem);
    return items;
}
