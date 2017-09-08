/**
Title: Find out user ranking.
Author: Venkatesh
Date: 09-03-2017
Date modified:
Description: The userranking.js file will connect to the event log api for each address and 
pass the result to ranking algorithm to find out ranking and balance. After that save these details to dynamo DB 
and insert the data in incremental manner.
*/
// initializing variables
var AWS = require("aws-sdk");


// export.handler is the main function where the lambda function will start execution
exports.handler = function(event, context) {
    var table = "ParetoMVP";
    // AWS authentication
    AWS.config.update({
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY:'],
        region: process.env['AWS_DEFAULT_REGION']
    });
	/*To be modified*/
	AWS.config.update({
        accessKeyId: 'AKIAJ4CHSFIC2NMYQYXQ',
        secretAccessKey: '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',
		region: 'us-west-2'
    });
	
    var request = require('request');

	//To get the list of address to find out the ranking. Currently it is hardcoded in Address TableName
	var dynamoDB = new AWS.DynamoDB.DocumentClient();
	var params = {
    TableName : "ParetoMVP-stg"
    };
 	
	dynamoDB.scan(params, onScan);

	function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(Address) {
            var token2 = addressPadding(Address.Address);
            getTransactions(token2);
        });

        // continue scanning if
    }
	}
	
	/*This function is to padding to 32 bit address */
	function addressPadding(value) {
		var padding=66;
        var n = value.length;
	    if(n!==padding)
		{
		    paddingLength =66 -(n)
            var zeroes = "0";
			for (var i = 0; i < paddingLength-1; i++) { zeroes += "0"; }
			return ("0x" + zeroes + value.substring(2,n));
		}
        return value;
	}
	
	/*Get the transactions for the address(topic2) from event log api*/
	function getTransactions(topic2)
	{
	    var eventLogAPIURL = "https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&topic2=";
	    eventLogAPIURL = eventLogAPIURL + topic2;
		request.get(eventLogAPIURL, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
			var jsonResponse = JSON.parse(body,topic2,eventLogAPIURL); // turn response into JSON
			getRanking(jsonResponse,topic2,eventLogAPIURL)
			
		  }
		});
	}
	/*This function is to find out the ranking, current kept some value as algorithm not available*/
	function getRanking(transactions,topic2,eventLogAPIURL)
	{
		var address = topic2;
		var url = eventLogAPIURL;
		var transactionLength = transactions.result.length;
		var ranking ={
			"Address":address,
			"URL":url,
			"APIResponse":transactions,
			"TimeStamp": getTimeStamp()
		}
		updateRanking(ranking);
	}
	
	/* To get the current timestamp*/
	function getTimeStamp()
	{
		var d = new Date();
		var n = d.getTime();
		return n;
	}
	
	/*TO update the ranking details in AddressRanking Table*/
	function updateRanking(ranking)
	{
		params = {
		TableName: 'AddressRanking-stg',
		Item: ranking
		};
		dynamoDB.put(params, function(err, data) {
			if (err) {
				context.fail('ERROR: Dynamo failed: ' + err);
			} else {
				console.log('Dynamo Success: ' + JSON.stringify(data, null, '  '));
				context.succeed('SUCCESS');
			}
		});
	}
	
    
}