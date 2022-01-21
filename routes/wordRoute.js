const express = require("express");
const wordRouter = express.Router();
const { getWord, getWordWithPos } = require("../controllers/word");

wordRouter.get("/:word", getWord);

wordRouter.get("/:word/:pos", getWordWithPos);

module.exports = wordRouter;
