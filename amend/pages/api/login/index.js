import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    const db = client.db();

    const userCollection = db.collection("user");

    const result = await userCollection.findOne({ email: data.email });
    // console.log(result);

    bcrypt.compare(data.password, result.password).then((resultx) => {
      if (resultx) {
        res.status(201).json({ message: "User found" });
      } else
        res.status(401).json({ message: "User Credentials doesn't match" });
    });
    client.close();
  }
}
