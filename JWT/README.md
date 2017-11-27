## JWT Authorizer ##

API Gateway custom authorizer is a "Lambda function you provide to control access to your API using bearer token authentication strategies, such as OAuth or SAML."

Whenever someone (or some program) attempts to call your API, API Gateway checks to see if there's a custom authorizer configured for the API.

If there is a custom authorizer for the API, API Gateway calls the custom authorizer and provides the authorization token extracted from the request header received.

You can use the custom authorizer to implement different types of authorization strategies, including JWT verification, to return IAM policies authorizing the request. If the policy returned is invalid or if the permissions are denied, the API call fails.

For a valid policy, API caches the returned policy, associating it with the incoming token and using it for the current and subsequent requests. You can configure the amount of time for which the policy is cached. The default value is 300 seconds, and the maximum length of caching is 3600 seconds (you can also set the value to 0 to disable caching).


For issuing the authtoken we have an seperate API Implemented 


### Steps Involved: ###

1) API Gateway checks for a properly-configured custom authorizer.
2) API Gateway calls the custom authorizer (which is a Lambda function) with the authorization token.
3) If the authorization token is valid, the custom authorizer returns the appropriate AWS Identity and Access Management (IAM) policies.
4) API Gateway uses the policies returned in step 3 to authorize the request.