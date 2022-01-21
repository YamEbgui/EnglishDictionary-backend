require("dotenv").config();
/**
 * Copyright 2010-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *
 * http://aws.amazon.com/apache2.0/
 *
 * This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
var AWS = require("aws-sdk");
const words = require("./dictionary.json");
console.log(words.length);

AWS.config.update({
  region: "us-west-2",
  accessKeyId: process.env.aws_access_key_id,
  accessSecretKey: process.env.aws_secret_access_key,
});

let docClient = new AWS.DynamoDB.DocumentClient();
let counter = 0;

let save = function () {
  for (let i = 0; i < 3000; i++) {
    if (counter === 113375) break;
    var input = {
      word: words[counter].word,
      pos: words[counter].pos,
      definitions: words[counter].definitions,
    };
    counter += 1;
    var params = {
      TableName: "dictionary",
      Item: input,
    };
    docClient.put(params, function (err, data) {
      if (data) {
        console.log(1);
      }
    });
  }
};

save();
setInterval(() => {
  console.log("finished");
  save();
  console.log("finished");
}, 150000);
