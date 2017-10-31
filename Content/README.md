## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service…
Serverless: Uploading CloudFormation file to S3…
Serverless: Uploading service .zip file to S3…
Serverless: Updating Stack…
Serverless: Checking Stack update progress…
Serverless: Stack update finished…

Service Information
service: serverless-XXXXX-stg
stage: stg
region: us-east-1
api keys:
  None
endpoints:
  POST - https://b5plyn0aha.execute-api.us-east-1.amazonaws.com/stg/content
  GET - https://b5plyn0aha.execute-api.us-east-1.amazonaws.com/stg/content
  GET - https://b5plyn0aha.execute-api.us-east-1.amazonaws.com/stg/Content/{id}
  PUT - https://b5plyn0aha.execute-api.us-east-1.amazonaws.com/stg/content/{id}
  DELETE - https://b5plyn0aha.execute-api.us-east-1.amazonaws.com/stg/content/{id}
  SEARCH - https://b5plyn0aha.execute-api.us-east-1.amazonaws.com/stg/search/Content


## Usage

You can create, retrieve, update, or delete Content with the following commands:

### Create a Content sample

```bash
curl -X POST https://XXXXXXX.execute-api.us-east-1.amazonaws.com/stg/Content --data '{ "EthereumAddress": "sadgaskdkasjhksdjahasdasdkj",  "EthereumRank": "123456",  "recordStatus": true}'
```

Example Result:
```bash
{ "Success": true, "Data": [ { "EthereumAddress": "sadgaskdkasjhksdjahasdasdkj", "EthereumRank": "123456", "recordStatus": true, "Id": "5faf4650-be21-11e7-a340-f355bb709593", "createdAt": 1509443620661, "updatedAt": 1509443620661 } ] }%
```

### List all Content

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/stg/Content
```

Example output:
```bash
{ "Success": true, "Data": [ { "EthereumAddress": "sadgaskdkasjhksdjahasdasdkj", "EthereumRank": "123456", "recordStatus": true, "Id": "5faf4650-be21-11e7-a340-f355bb709593", "createdAt": 1509443620661, "updatedAt": 1509443620661 } ] }%
```

### Get one Content

```bash
# Replace the <id> part with a real id from your Content table
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/stg/Content/<id>
```

Example Result:
```bash
{ "Success": true, "Data": [ { "EthereumAddress": "sadgaskdkasjhksdjahasdasdkj", "EthereumRank": "123456", "recordStatus": true, "Id": "5faf4650-be21-11e7-a340-f355bb709593", "createdAt": 1509443620661, "updatedAt": 1509443620661 } ] }%
```

### Update a Content

```bash
# Replace the <id> part with a real id from your Content table
curl -X PUT https://XXXXXXX.execute-api.us-east-1.amazonaws.com/stg/Content/<id> --data '{ "Success": true, "Data": [ { "EthereumAddress": "sadgaskdkasjhksdjahasdasdkj", "EthereumRank": "123456", "recordStatus": true, "Id": "5faf4650-be21-11e7-a340-f355bb709593", "createdAt": 1509443620661, "updatedAt": 1509443620661 } ] }'
```

Example Result:
```bash
{ "Success": true, "Data": [ { "EthereumAddress": "sadgaskdkasjhksdjahasdasdkj", "EthereumRank": "123456", "recordStatus": true, "Id": "5faf4650-be21-11e7-a340-f355bb709593", "createdAt": 1509443620661, "updatedAt": 1509443620661 } ] }%
```

### Delete a Content

```bash
# Replace the <id> part with a real id from your Content table
curl -X DELETE https://XXXXXXX.execute-api.us-east-1.amazonaws.com/stg/Content/<id>
```

No output

## Scaling

### AWS Lambda

By default, AWS Lambda limits the total concurrent executions across all functions within a given region to 100. The default limit is a safety limit that protects you from costs due to potential runaway or recursive functions during initial development and testing. To increase this limit above the default, follow the steps in [To request a limit increase for concurrent executions](http://docs.aws.amazon.com/lambda/latest/dg/concurrent-executions.html#increase-concurrent-executions-limit).

### DynamoDB

When you create a table, you specify how much provisioned throughput capacity you want to reserve for reads and writes. DynamoDB will reserve the necessary resources to meet your throughput needs while ensuring consistent, low-latency performance. You can change the provisioned throughput and increasing or decreasing capacity as needed.

This is can be done via settings in the `serverless.yml`.

```yaml
  ProvisionedThroughput:
    ReadCapacityUnits: 1
    WriteCapacityUnits: 1
```


