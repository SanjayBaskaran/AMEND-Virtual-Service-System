import { MongoClient } from "mongodb";

export default async function AddService(req, res) {
  const client = await MongoClient.connect("mongodb://localhost:27017/amend");
  const db = client.db();
  const userCollection = db.collection("service");
  const result = await userCollection.find().toArray();
  res.status(201).json({"services":result});
  client.close();
  
}
