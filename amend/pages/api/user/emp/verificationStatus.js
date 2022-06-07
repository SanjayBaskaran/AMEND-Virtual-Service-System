import { MongoClient } from "mongodb";

export default async function SignUp(req, res) {
  if (req.method === "POST") {
    console.log("In ");
    const data = JSON.parse(req.body);
    // console.log(data);
    data["verified"] = "not yet";
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
