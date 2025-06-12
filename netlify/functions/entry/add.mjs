const clientPromise = require("../../lib/mongodb"); // Relative path
// or: const clientPromise = require("../../../lib/mongodb"); based on location

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ success: false, message: "Method Not Allowed" }),
    };
  }

  try {
    const body = JSON.parse(event.body);
    const { username, date, time, description, amount } = body;

    if (!username || !description || isNaN(amount)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ success: false, message: "Invalid data" }),
      };
    }

    const client = await clientPromise;
    const db = client.db("Xtrack");
    const collection = db.collection("entries");

    await collection.insertOne({ username, date, time, description, amount });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error("Error adding entry:", err);

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: "Server error" }),
    };
  }
};
