const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_ATLAS_URI;

const connectMongoose = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const dbName = mongoose.connection.name;
    console.log("Connected to MongoDB using Mongoose - dbName:", dbName);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = { connectMongoose };
