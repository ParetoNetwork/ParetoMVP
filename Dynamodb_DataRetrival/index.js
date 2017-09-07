/**
Title: pull data from dynamo DB table.
Author: uday
Date: 11-16-2016
Date modified:
Description: The index.js file will connect to the dynamo DB and pull the data from dbBased on Request parameter
*/
// initializing variables
var dynamo = require('dynamodb');
var Joi = require('joi');
var moment = require("moment");
const _ = require("underscore")
var result = {};

// export.handler is the main function where the lambda function will start execution
exports.handler = function(event, context) {
    console.log(JSON.stringify(event));
    console.log(JSON.stringify(context));
   //Declaring Table from process envronment
    var tableName = process.env['AWS_Dynamodb_TableName'];
    // AWS authentication
    dynamo.AWS.config.update({
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY:'],
        region: process.env['AWS_DEFAULT_REGION']
    });

    // initializing Table Schema
    var dbData = dynamo.define(tableName, {
        hashKey: 'ID',
        rangeKey: undefined,
        tableName: tableName,
        timestamps: false,
        schema: {
            ID: Joi.number(),
            Balance: Joi.number(),
            Address: Joi.string(),
            Rank: Joi.number(),
            Token: Joi.string(),
        }
    });
	
	
    // Dynamic Query Formation based on the request parameters
    var finalquerystring = "dbData.scan().loadAll()"
    for (var key in event) {
		// based on datatype decidng the condition to be applied
        if (key != 'Address'&&key != 'Token') {
            finalquerystring = finalquerystring + ".where('" + key + "').equals(" + event[key] + ")"
        } else {
            finalquerystring = finalquerystring + ".where('" + key + "').contains('" + event[key] + "')"
        }

    }
    finalquerystring = finalquerystring + ".exec(callback);"

   // call back function to return response
    function callback(err, res) {
		// success
        if (!err) {
            console.log(res)
            result.Success = true;
            result.Data = res          
            console.log("success"); 
            context.succeed(result);
        } else {
			// err
            result.Success = false;
            result.Data = [];
            result.error = JSON.stringify(err);
            console.log(JSON.stringify(err)); 
            context.succeed(result);
        }


    }
    console.log(finalquerystring)
	// converting the dynamic query string  to a function
    eval(finalquerystring)

}