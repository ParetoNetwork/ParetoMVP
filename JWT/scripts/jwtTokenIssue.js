var nJwt = require('njwt');
var signingKey =process.env['AWS_JWT_KEY']
var expiryMinutes=process.env['AWS_JWT_EXPIRY_MINUTES']
     function sendResponse(result, callback) {
			let response = {
				statusCode: 200,
				body: JSON.stringify(result)
			};
			callback(null, response);
		}
module.exports.jwtTokenIssue =  function(event, context,callback) {
	console.log(JSON.stringify(event));
      try {		
	 var claims = {
		  iss: "Paretomvp",  
		  sub: "user",
		  scope: "users,admins"
		}
		// claims.request=event.body;
		var jwt = nJwt.create(claims,signingKey);
		jwt.setExpiration(new Date().getTime() + (60*expiryMinutes*1000));
		var result={};
		result.Success=true
		result.Token=jwt.compact();
		console.log(result.Token)
		sendResponse(result, callback)
		
      } catch (ex) {
        console.log(ex, ex.stack);
        result.Success=false;
		result.error=ex;
        sendResponse(result, callback)
      }
};