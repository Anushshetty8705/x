import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return Response.json({ success: false, message: "Username is required" });
    }

    const client = await clientPromise;
    const db = client.db("Xtrack");
    const collection = db.collection("entries");

    const entries = await collection
      .find({ username })
      .sort({ _id: -1 }) // latest first
      .toArray();

    return Response.json({ success: true, entries });
  } catch (err) {
    console.error("Error getting entries:", err);
    return Response.json({ success: false, message: "Server error" });
  }
}
