import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    const db = client.db();

    const userCollection = db.collection("user");

    const result = await userCollection.findOne({ email: data.email });
    console.log(result);

      if (result) {
        res.status(401).json({ message: "Email id already exists" });
      } else
        res.status(201).json({ message: "Create user" });
    client.close();
  }
}
