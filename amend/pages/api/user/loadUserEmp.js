import { MongoClient } from "mongodb";
import jsonwebtaken from 'jsonwebtoken';
export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    
    const db = await client.db();
    var email = jsonwebtaken.verify(data.email, "SECRET_CODE_USER_LOGIN").email;
    // console.log(email);
    const userCollection =await db.collection("emp");

    const result = await userCollection.findOne({ email: email });
    // console.log(result);
      if (result) {
        res.status(200).json({ details: result });
      } else
        res.status(401).json({ message: "User Credentials doesn't match" });
    client.close();
  }
}
