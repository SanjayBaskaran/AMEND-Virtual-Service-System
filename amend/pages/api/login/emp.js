import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    const db = await client.db();

    const userCollection =await db.collection("emp");

    const result = await userCollection.findOne({ email: data.email });
    // console.log(result);

    bcrypt.compare(data.password, result.password).then((resultx) => {
      if (resultx) {
        res.status(201).json({ message: "Emp found" });
      } else
        res.status(401).json({ message: "Emp Credentials doesn't match" });
    });
    client.close();
  }
}
