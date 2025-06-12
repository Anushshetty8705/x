// pages/api/entry/delete.js
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request) {
  const body = await request.json();

  if (!body.id) {
    return Response.json({ success: false, message: "Missing ID" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("Xtrack");
  const collection = db.collection("entries");

  const result = await collection.deleteOne({ _id: new ObjectId(body.id) });

  if (result.deletedCount === 1) {
    return Response.json({ success: true, message: "Deleted successfully" });
  } else {
    return Response.json({ success: false, message: "Entry not found" }, { status: 404 });
  }
}
