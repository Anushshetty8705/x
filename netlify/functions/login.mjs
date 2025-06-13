import { MongoClient } from 'mongodb';
export const config = {
  region: 'bom1' // 🟢 Sets function to run in India region
};


const uri = process.env.MONGODB_URI;
const dbName = "Xtrack";
console.log("🔍 MONGODB_URI:", uri);
let cachedClient = null;
let cachedDb = null;

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Only POST requests allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    // Use cached DB connection if available
    if (!cachedClient || !cachedDb) {
      const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000, // optional timeout
      });

      await client.connect();
      cachedClient = client;
      cachedDb = client.db(dbName);
    }

    const collection = cachedDb.collection("users");

    const user = await collection.findOne({
      username: body.username,
      password: body.password,
    });

    if (user) {
      return {
        statusCode: 200,
        body: JSON.stringify({ error: false, message: "success" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        error: true,
        message: "User does not exist",
      }),
    };
  } catch (error) {
    console.error("Login Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: true,
        message: "Internal server error",
      }),
    };
  }
}
