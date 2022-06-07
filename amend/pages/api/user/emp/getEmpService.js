import { MongoClient } from "mongodb";

export default async function AddService(req, res) {
  if (req.method == "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    const db = client.db();
    const userCollection = db.collection("emp");
    const result = await userCollection
      .find({ serviceName: data.serviceName })
      .toArray();
    res.status(201).json({ emps: result });
    client.close();
  }
}
