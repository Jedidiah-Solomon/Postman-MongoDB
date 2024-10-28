const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.MONGODB_ATLAS_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectMongoDB = async () => {
  try {
    await client.connect();
    const dbName = client.db().databaseName;
    console.log("Connected to MongoDB using MongoDB client - dbName:", dbName);
    return client;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = { connectMongoDB, client };
