'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
let result = {};
module.exports.create = (event, context, callback) => {
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

  const timestamp = new Date().getTime();
  let data = JSON.parse(event.body);  
  data.Id=uuid.v1();
  data.hasOwnProperty("recordStatus")==true?data.recordStatus:data.recordStatus=true;  
  data.createdAt=timestamp;
  data.updatedAt=timestamp;
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: data,
  };


  // write the todo to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
       onexcute(error, null)
    }   
	 onexcute(null, params)   
  });
};
