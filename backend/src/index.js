require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const databaseConnection = require("./config/db");

const app = express();
const PORT = process.env.PORT || 1111;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const startServer = async () => {
  try {
    databaseConnection;
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  } catch (err) {
    console.error(`Start server failed ${err}`);
    process.exit(1);
  }
};

startServer();
