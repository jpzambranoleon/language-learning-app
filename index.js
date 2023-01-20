const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongooseConnection = require("./utility/mongoose.connection");
const path = require("path");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// Create application with express
const app = express();

// Connect to database
MongooseConnection();

// Middlewares
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
const configuration = new Configuration({
  organization: "org-UmsTiOJ79hIOscV8kXQneBET",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 8000;

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

// serving the frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.use("/api/auth", require("./routes/auth.routes"));

app.listen(PORT, () => {
  console.log(`Backend server is running on ${PORT}`);
});
