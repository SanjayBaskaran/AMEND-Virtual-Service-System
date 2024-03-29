import { MongoClient } from "mongodb";

export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    const db = client.db();
    const userCollection = db.collection("emp");
    const query = { email: data.email };
    console.log(data);
    const update = {
      $set: {
        verified:"verified"
      },
    };
    const exist = await userCollection.updateOne(query,update);
    console.log(exist);
    res.status(201).json(exist);
  }
}
