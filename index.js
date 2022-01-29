require("dotenv").config();
const express = require("express");
const wordRouter = require("./routes/wordRoute");
const posRouter = require("./routes/posRoute");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/word", wordRouter);
app.use("/part-of-speech", posRouter);

app.listen(PORT, () => {
  console.log(`running on localhost:${PORT}`);
});
