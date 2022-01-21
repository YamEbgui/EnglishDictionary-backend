require("dotenv").config();
const express = require("express");
const wordRouter = require("./routes/wordRoute");
const app = express();
const PORT = process.env.PORT || 3000;

const dictionary = require("./DB/dictionary.json").filter(
  (word) => word.pos === "p."
);
console.log([...new Set(dictionary)]);

app.use(express.json());

app.use("/", wordRouter);

app.listen(PORT, () => {
  console.log(`running on localhost:${PORT}`);
});
