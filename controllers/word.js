const DynamoDB = require("./config");
const { returnShortVersion, checkIfExist } = require("./index");

//HANDLE RESPONSE FROM DYNAMODB TO RETURN HTTP RESPONSE
function handleResponse(req, res, response) {
  switch (response.Count) {
    case 1:
      res.json(response.Items[0]);
      break;
    case 0:
      res.status(404).json({ error: "Word wasn't found" });
      break;
    default:
      res.json(response.Items);
      break;
  }
}

async function getWord(req, res) {
  try {
    const word = req.params.word;
    const params = {
      TableName: "dictionary",
      KeyConditionExpression: "word = :word",
      ExpressionAttributeValues: {
        ":word": word.toUpperCase(),
      },
    };
    const response = await DynamoDB.query(params).promise();
    handleResponse(req, res, response);
  } catch (err) {
    console.log("error");
    res.status(400).json(err);
  }
}

async function getWordWithPos(req, res) {
  try {
    const word = req.params.word;
    const pos = req.params.pos.toLowerCase();
    if (!checkIfExist(pos)) throw { error: "Part of speech wasn't found " };
    const params = {
      TableName: "dictionary",
      KeyConditionExpression: "word = :word and pos = :pos",
      ExpressionAttributeValues: {
        ":word": word.toUpperCase(),
        ":pos": returnShortVersion(pos) + ".",
      },
    };
    const response = await DynamoDB.query(params).promise();
    handleResponse(req, res, response);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = { getWord, getWordWithPos };
