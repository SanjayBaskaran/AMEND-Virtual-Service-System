import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    console.log(data);
    const client = await MongoClient.connect("mongodb://localhost:27017/admin");
    const db = client.db();

    const userCollection = db.collection("Admin");

    const result = await userCollection.findOne({ username: data.username});
    console.log(result);

    bcrypt.compare(data.password, result.password).then((resultx) => {
      if (resultx) {
        res.status(201).json({ message: "Admin found" });
      } else
        res.status(401).json({ message: "Admin Credentials doesn't match" });
    });
    client.close();
  }
}
