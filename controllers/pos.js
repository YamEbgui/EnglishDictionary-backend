const DynamoDB = require("./config");
const { returnShortVersion, checkIfExist } = require("./index");

//HANDLE RESPONSE FROM DYNAMODB TO RETURN HTTP RESPONSE
function handleResponse(req, res, response) {
  switch (response.Count) {
    case 0:
      res.status(404).json({ error: "No words from this pos" });
      break;
    default:
      const randomNum = Math.floor(Math.random() * response.Count);
      res.json(response.Items[randomNum]);
      break;
  }
}

function handleResponseWithQuery(req, res, response, query) {
  const filteredArray = response.Items.filter(
    (item) => item.word[0] === query[0].toUpperCase()
  );
  const filteredResponse = {
    Items: filteredArray,
    Count: filteredArray.length,
  };
  handleResponse(req, res, filteredResponse);
}

async function getRandomWord(req, res) {
  try {
    const pos = req.params.part;
    const query = req.query.letter[0];
    if (!checkIfExist(pos)) throw { error: "Part of speech wasn't found " };
    const params = {
      TableName: "dictionary",
      FilterExpression: "pos = :pos",
      ExpressionAttributeValues: {
        ":pos": returnShortVersion(pos) + ".",
      },
    };
    const response = await DynamoDB.scan(params).promise();
    if (!query) return handleResponse(req, res, response);
    handleResponseWithQuery(req, res, response, query);
  } catch (err) {
    res.status(400).json(err);
  }
}

module.exports = { getRandomWord };
