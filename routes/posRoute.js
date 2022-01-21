const express = require("express");
const posRouter = express.Router();
const { getRandomWord } = require("../controllers/pos");

posRouter.get("/:part", getRandomWord);

module.exports = posRouter;
