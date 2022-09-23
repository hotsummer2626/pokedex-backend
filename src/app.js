require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;
const morganLog = (process.env.NODE_ENV = "production"
  ? morgan("common")
  : morgan("dev"));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
