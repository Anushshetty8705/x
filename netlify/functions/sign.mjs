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

    const usernameExists = await collection.findOne({ username: body.username });
    if (usernameExists) {
      return {
        statusCode: 200,
        body: JSON.stringify({ error: "true", message: "username exists" }),
      };
    }

    const emailExists = await collection.findOne({ email: body.email });
    if (emailExists) {
      return {
        statusCode: 200,
        body: JSON.stringify({ error: "true", message: "email exists" }),
      };
    }

    const phoneExists = await collection.findOne({ phone: body.phone });
    if (phoneExists) {
      return {
        statusCode: 200,
        body: JSON.stringify({ error: "true", message: "phone number exists" }),
      };
    }

    await collection.insertOne({
      username: body.username,
      password: body.password,
      email: body.email,
      phone: body.phone,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ error: "false", message: "success" }),
    };
  } catch (error) {
    console.error("Signup Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "true", message: "Internal server error" }),
    };
  }
}
