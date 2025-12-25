require("dotenv/config");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool = require("./config/db");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const serviceRouter = require("./routes/service.route");

const app = express();
const PORT = process.env.PORT || 1111;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/services", serviceRouter);

const startServer = async () => {
  try {
    pool;
    app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
  } catch (err) {
    console.error(`Start server failed ${err}`);
    process.exit(1);
  }
};

startServer();
