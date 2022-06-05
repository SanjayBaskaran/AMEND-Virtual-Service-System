import { MongoClient } from "mongodb";

export default async function getImage(req, res) {
  const client = await MongoClient.connect("mongodb://localhost:27017/amend");
  const db = client.db();

  const userCollection = db.collection("image-models");
  const data = JSON.parse(req.body);
  console.log(data);
  const result = await userCollection.findOne({name:data.name});
  // console.log(result);
    if (result) {
      res.status(201).json(result);
    }else{
        res.status(401).json({message:"data con"});
    }
  client.close();
}
