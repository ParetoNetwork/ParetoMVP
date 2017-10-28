/**
Title: Retrive Content details from Content dynamo DB table.
Author: uday
Date: 10-20-2017
Date modified:
Description: The index.js file will connect to the dynamo DB and retrive  the data from content table based on search parameters
*/
// initializing variables
var dynamo = require('dynamodb');
var Joi = require('joi');
var result = {};

// export.handler is the main function where the lambda function will start execution
module.exports.search = function(event, context, callback) {
	// funtion to send the response back
		function sendResponse(result, callback) {
			var response = {
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
				result.Data = res.Items;
				result.Count = res.Count;
				result.ScannedCount = res.ScannedCount;
				console.log("success");
			} else {
				result.Success = false;
				result.Data = [];
				result.error = JSON.stringify(err);
				console.log(JSON.stringify(err));
			}
			sendResponse(result, callback)
		}



	
	
	
	
    try {
		
        // AWS authentication
        dynamo.AWS.config.update({
            accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
            secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY:'],
            region: process.env['AWS_DEFAULT_REGION']
        });
		//pulling the variables from environment variables
        var tableName = process.env['DYNAMODB_TABLE'];
        //initializing  the dynamodb table
        var dbData = dynamo.define(tableName, {
            hashKey: process.env['AWS_TableName_HashKey'],
           // rangeKey: process.env['AWS_TableName_RangeKey'],
            tableName: tableName,
            timestamps: false,
            schema: {

            }
        });
		// forming the query/execute function
        var querystring = "dbData.scan().loadAll()";
        var querykey = JSON.parse(event.body)
        console.log(querystring)
        for (var key in querykey) {
            querystring = querystring + ".where('" + key + "').contains('" + querykey[key] + "')"
        }
        querystring = querystring + ".exec(onexcute);"
        //converting generated string to function
        eval(querystring)

    } catch (err) {
        result.Success = false;
        result.Data = [];
        result.error = JSON.stringify(err);
        sendResponse(result, callback)
    }


	
	
}