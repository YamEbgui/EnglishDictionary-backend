const DynamoDB = require("./config");
const partsOfSpeech = [
  ["n", "noun"],
  ["prep", "preposition"],
  ["a", "adverb"],
  ["v", "verb"],
  ["adv", "adjective"],
  ["p", "proverb"],
  ["interj", "interjection"],
  ["conj", "conjunction"],
  ["pron", "pronoun"],
];

//CHECK IF POS EXIST IN THE ARRAY OF POS
function checkIfExist(pos) {
  let isExist = false;
  partsOfSpeech.map((fullVersionPos) => {
    if (fullVersionPos[0] === pos || fullVersionPos[1] === pos) {
      isExist = true;
    }
  });
  return isExist;
}

//RETURN SHORT VERSION OF THE POS FROM THE POS ARRAY
function returnShortVersion(pos) {
  let shortVersion;
  partsOfSpeech.map((fullVersionPos) => {
    if (fullVersionPos[0] === pos || fullVersionPos[1] === pos) {
      shortVersion = fullVersionPos[0];
    }
  });
  return shortVersion;
}

//HANDLE RESPONSE FROM DYNAMODB TO RETURN HTTP RESPONSE
function httpResponse(req, res, response) {
  console.log(response.Count);
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
    httpResponse(req, res, response);
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
    httpResponse(req, res, response);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = { getWord, getWordWithPos };
