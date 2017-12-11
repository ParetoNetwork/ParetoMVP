## Block Height Scheduler Lambda 

    This lambda function is an subscriber for the  cloud watch scheduler event it invokes at regular interval and pulls the data from the etherscan api and dumps the block height details to the s3 config file 

    
	Currently the scheduler will invoke's the lambda  at an interval of 10 min  and it writes the configuration to below s3 bucket.

    Bucket Name : stg.pareto.blockheight.config	
	File Name: stg-paretoBlockHeightConfig.js
	
	
	
	
	Note:
	 For testing we can delete the file in the above bucket .After 10 min you should see the file generated in s3 bucket
		

