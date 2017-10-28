'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
let result = {};
module.exports.update = (event, context, callback) => {
	 // funtion to send the response back
		function sendResponse(result, callback) {
			let response = {
				statusCode: 200,
				body: JSON.stringify(result)
			};
			callback(null, response);
		}
	
	
		// on execute call back function on retriving records
		function onexcute(err, res) {
			if (!err) {
				console.log(res)
				result.Success = true;
				result.Data=[];
				result.Data.push(res.Attributes);		
				console.log("success");
			} else {
				result.Success = false;
				result.Data = [];
				result.error = JSON.stringify(err);
				console.log(JSON.stringify(err));
			}
			sendResponse(result, callback)
		}
	
	
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  // validation
  if (typeof data.recordStatus !== 'boolean') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t update the todo item.',
    });
    return;
  }
  let expression_attribute_names={
      
      ':recordStatus': data.recordStatus,
      ':updatedAt': timestamp,
    }
	for(let index in data) { 
		   expression_attribute_names[":"+index]=data[index];
	}
	let updateExpression=[]
	for(let str in expression_attribute_names) { 
	
		 updateExpression.push(" "+str.split(':')[1]+" = "+str)
	}
	let UEdta="SET"+updateExpression.join(',');
	console.log("test "+UEdta)
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      Id: event.pathParameters.id
    },
    // ExpressionAttributeNames: {
      // '#todo_text': 'text',
    // },
    ExpressionAttributeValues:expression_attribute_names ,
    UpdateExpression: UEdta,//'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    onexcute(error, result)
  });
};
