const mongoose = require("mongoose");

const MongooseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection success.");
    })
    .catch((err) => {
      console.log("Mongo connection error", err);
    });
};

module.exports = MongooseConnection;
