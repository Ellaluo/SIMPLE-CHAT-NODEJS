const AWS = require('aws-sdk');
const ENDPOINT = 'xxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/production';
const client = new AWS.ApiGatewayManagementApi({ endpoint: ENDPOINT });
const names = {};
const sendToOne = async(id, body) => {
  try{
    await client.postToConnection({
    'ConnectionId': id,
    'Data': Buffer.from(JSON.stringify(body)),
    }).promise();
  }catch(err){
    console.log(err);
  }
};

const sendToAll = async(ids, body) => {
  try{
    const all = ids.map(i => sendToOne(i, body));
    return Promise.all(all);
  }catch(err){
    console.log(err);
  }
};

exports.handler = async (event) => {
  if(event.requestContext){
    console.log(event);
    const connectionId = event.requestContext.connectionId;
    const routeKey = event.requestContext.routeKey;
    let body = {};
    try{
      if(event.body){
        body = JSON.parse(event.body);
      }
    }catch(err){

    }

    switch(routeKey){
      case '$connect':
        console.log(`[connected] ConnectionId: ${connectionId}`);
        break;
      case '$disconnect':
        console.log(`[disconnected] ConnectionId: ${connectionId}, Name: ${body.name}`);
        await sendToAll(Object.keys(names), {systemMessage: `${names[connectionId]} has left the chat`});
        delete names[connectionId];
        await sendToAll(Object.keys(names), {members: Object.values(names)});
        break;
      case 'join':
        console.log(`[joined] ConnectionId: ${connectionId}, Name: ${body.name}`);
        names[connectionId] = body.name;
        await sendToAll(Object.keys(names), {members: Object.values(names)});
        await sendToAll(Object.keys(names), {systemMessage: `${names[connectionId]} has joined the chat`});
        break;
      case 'sendPublic':
        console.log(`[sendPublic] ConnectionIds: ${JSON.stringify(Object.keys(names))}, Message: ${body.message}`);
        await sendToAll(Object.keys(names), { publicMessage: `${names[connectionId]} says: ${body.message}` });
        break;
      case 'sendPrivate':
        console.log(`[sendPrivate] Name: ${body.to}, Message: ${body.message}`);
        const to = Object.keys(names).find(key => names[key] === body.to);
        await sendToOne(to, { privateMessage: `${names[connectionId]} says: ${body.message}` });
        break;
      case '$default':
        console.log("-----default-----");
        break;
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!')
  };
  return response;
};