const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongodb = require("mongodb");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { connectMongoDB } = require("./config/mongodbClient");
const { connectMongoose } = require("./config/mongooseConnection");

dotenv.config();

const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// About page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public/about.html"));
});

// // Connect to MongoDB with MongoDB Client
connectMongoDB();

// // Connect to MongoDB with Mongoose
connectMongoose();

app.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
