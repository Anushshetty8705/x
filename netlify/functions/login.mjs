import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "Xtrack";

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Only POST requests allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body);

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("users");

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
