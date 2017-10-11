# Serverless: 

# Installing the Serverless Framework

  1) Open up a terminal and type    npm install -g serverless     to install Serverless.
  2) To see which version of serverless you have installed run:   serverless --version
  3) Setting the configuration
   
       default profile: 
	      
		    serverless config credentials --provider aws --key <accesskey> --secret <secretkey>
			
	   custom profile:
	         
			  serverless config credentials --provider aws --key <accesskey> --secret <secretkey> --profile <profilname> --overwrite
	   
  4) If you already have template you can skip this step
            
			// create template
				serverless create --template aws-nodejs --name <templatename>

				serverless create --template aws-nodejs --path <pathname>
				

  5) Now you can see the files generated and you can modify the naming convection accordingly in the .yml and .js file
  6) proceed implemeting your function in js  (ie installing node modules and creating your handler function)
  
  7) Now to zip the code and create a deployment package 
  
      Default env :	serverless package

	  Custum env : serverless package --stage <stage> --region <region>
 
  8) To deploy :
   
      Default env :	 serverless deploy

	  Custum env : serverless deploy --stage <stage> --region <region>

 9)  Now using cloud formation template it deploy's the lamda to concern region using the  Serverless Setup
		  
  

Links :https://serverless.com/framework/docs/providers/aws/cli-reference/


# ChatBot :  

This function is a subscriber for Api-Gateway and it recieves data from the bot based on the webhook set


 To configure webhook:
 
	 Set webhook
	 curl -X POST https://api.telegram.org/bot<token>/setWebhook?url=<apigateway endpoint>


	Removing webhook
	curl -X POST https://api.telegram.org/bot<token>/setWebhook

             
 
 
 Note : Replace <token> with concern values
 
 
 
 
