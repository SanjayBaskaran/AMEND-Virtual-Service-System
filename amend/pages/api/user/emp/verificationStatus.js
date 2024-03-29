import { MongoClient } from "mongodb";

export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    // console.log(data);
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    console.log("Connected");
    const db = client.db();
    const userCollection = db.collection("emp");
    const query = { name: req.body.email };
    const update = {
      $set: {
        verified:"pending"
      },
    };
    const exist = await userCollection.updateOne(query,update);
    res.status(201).json(exist);
  }
}
