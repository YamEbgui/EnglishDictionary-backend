const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.aws_access_key_id,
  accessSecretKey: process.env.aws_secret_access_key,
});

const dynamodb = new AWS.DynamoDB();

const params = {
  TableName: "dictionary",
  KeySchema: [
    { AttributeName: "word", KeyType: "HASH" }, //Partition key
    { AttributeName: "pos", KeyType: "RANGE" }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "word", AttributeType: "S" },
    { AttributeName: "pos", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to create table. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      "Created table. Table description JSON:",
      JSON.stringify(data, null, 2)
    );
  }
});
