'use strict';
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.DYNAMODB_TABLE,
};
let result = {};
module.exports.list = (event, context, callback) => {
	
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
			// handle potential errors
			if (!err) {
				console.log(res)
				result.Success = true;				
				result.Data=res.Items;		
				result.Count = res.Items.length;
				console.log("success");
			} else {
				result.Success = false;
				result.Data = [];
				result.error = JSON.stringify(err);
				result.Count = res.Data.length;
				console.log(JSON.stringify(err));
			}
			sendResponse(result, callback)
		}
	
  // fetch all todos from the database
  dynamoDb.scan(params, (error, result) => {
    onexcute(error, result)
  });
};
