'use strict';
var nJwt = require('njwt');
var AWS = require('aws-sdk');
var signingKey =process.env['AWS_JWT_KEY']
var result={
	"Message":"Unauthorized",
    "Success": false,
	"Data": {
	"Items": []
	}
}

var generatePolicy = function(principalId, effect, resource) {
    let authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        let policyDocument = {};
        policyDocument.Version = '2012-10-17'; // default version
        policyDocument.Statement = [];
        let statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; // default action
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}
	
module.exports.jwt =  function(event, context) {
	console.log(JSON.stringify(event));
      try {		
        let verifiedJwt = nJwt.verify(event.headers.Authorization, signingKey);
         console.log(verifiedJwt);     
         let token="unauthorized";
		 
        if (verifiedJwt.body.scope.indexOf("admins") > -1) {
		   token="admins"
        }
		if (verifiedJwt.body.scope.indexOf("users") > -1) {
		   token="users"
        }
		switch (token) {
				case 'admins':				
					context.succeed(generatePolicy('admins', 'Allow', '*'));
					break;
				case 'users':				
					context.succeed(generatePolicy('users', 'Allow',event.methodArn));
					break;
				case 'deny':
					context.succeed(generatePolicy('user', 'Deny', event.methodArn));
					break;
				case 'unauthorized':
					context.succeed(generatePolicy('user', 'Deny', event.methodArn));
					break;
				default:
					context.succeed(generatePolicy('user', 'Deny', event.methodArn));
			}        

      } catch (ex) {
        console.log(ex, ex.stack);
        context.succeed(generatePolicy('user', 'Deny', event.methodArn));
      }
};