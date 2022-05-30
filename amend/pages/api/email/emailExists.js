import { MongoClient } from "mongodb";
export default async function SignUp(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    console.log(data,"TESTSTETST");
    const client = await MongoClient.connect("mongodb://localhost:27017/amend");
    const db = await client.db();

    const userCollection =await db.collection("user");
    const result = await userCollection.findOne({ email: data.email });
    console.log("testx",result);

      if (result) {
        res.status(401).json({ message: "Email id already exists",exists:true });
      } else
        res.status(201).json({ message: "Create user" ,exists:false});
    client.close();
  }
}
