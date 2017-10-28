'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
let result = {};
module.exports.get = (event, context, callback) => {
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
				result.Data.push(res.Item);		
				console.log("success");
			} else {
				result.Success = false;
				result.Data = [];
				result.error = JSON.stringify(err);
				console.log(JSON.stringify(err));
			}
			sendResponse(result, callback)
		}
	
	// get request parameters
	  const params = {
		TableName: process.env.DYNAMODB_TABLE,
		Key: {
		  Id: event.pathParameters.id,
		},
	  };

	  // fetch todo from the database
	  dynamoDb.get(params, (error, result) => {
	   onexcute(error, result)
	  });
};
