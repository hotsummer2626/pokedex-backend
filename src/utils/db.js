const mongoose = require("mongoose");

const connectToDB = () => {
  const connectionString = process.env.CONNECTION_STRING + process.env.DB_NAME;
  const db = mongoose.connection;

  db.on("connected", () => {
    console.log(`DB connected with ${connectionString}`);
  });
  db.on("error", () => {
    console.log("connection failed");
    console.log(error);
    process.exit(1);
  });
  db.on("disconnected", () => {
    console.log("DB disconnected");
  });

  mongoose.connect(connectionString);
};

module.exports = { connectToDB };
