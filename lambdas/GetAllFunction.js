var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1"/*,
  endpoint: "http://localhost:8000"*/
});

var docClient = new AWS.DynamoDB.DocumentClient();

// console.log("Querying for movies from 1985.");

var params = {
    TableName : "headsincloud_question"/*,
    *KeyConditionExpression: "#question_id != :id",
   ExpressionAttributeNames:{
        "#question_id": "question_id"
    },
    ExpressionAttributeValues: {
        ":id": "1985"
    }*/
};


exports.handler = async (event) => {
/*var result = await docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
        });
    }
}).promise();*/

let scanResults = [];
    let items;
    do{
        items =  await docClient.scan(params).promise();
        items.Items.forEach((item) => scanResults.push(item));
        params.ExclusiveStartKey  = items.LastEvaluatedKey;
    }while(typeof items.LastEvaluatedKey != "undefined");
    
   // console.log(JSON.stringify(scanResults));
    
    // TODO implement
    const response = {
        statusCode: 200,
        body: scanResults,
    };
    return response;
};
