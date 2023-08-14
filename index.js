const express = require("express");
const cors = require("cors");
const MongooseConnection = require("./utility/mongoose.connection");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

// Create application with express
const app = express();

// Reminder: fix issue urgent, like now please hurry like now please 

// Connect to database
MongooseConnection();

// Middlewares
// app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

const PORT = process.env.PORT || 8000;

// serving the frontend
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/users.routes"));
app.use("/api/conversations", require("./routes/conversation.routes"));
app.use("/api/messages", require("./routes/message.routes"));
app.use("/api/assistants", require("./routes/assistant.routes"));

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});
/*
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
}); */

app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
});
