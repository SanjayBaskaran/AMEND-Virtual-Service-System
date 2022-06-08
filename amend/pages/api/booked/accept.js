import { MongoClient } from "mongodb";

export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    const db = client.db();
    const userCollection = db.collection("book");
    const query = { request: data.request ,date: data.date};
    const update = {
      $set: {
        confirm:"confirmed"
      },
    };
    const exist = await userCollection.updateOne(query,update);
    console.log(exist);
    res.status(201).json(exist);
  }
}
