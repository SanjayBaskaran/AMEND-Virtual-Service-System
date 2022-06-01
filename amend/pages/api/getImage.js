import { MongoClient } from "mongodb";

export default async function getImage(req, res) {
  //   console.log("res", req);
  //   const response = await fetch("http://localhost:3001/")
  //     .then((response) => {
  //     //   console.log(response);

  //       return response.json();
  //     })
  //     .catch((err) => {
  //     });
  //   return res.status(200).json(response);
  const client = await MongoClient.connect("mongodb://localhost:27017/amend");
  const db = client.db();

  const userCollection = db.collection("image-models");

  const result = await userCollection.findOne({});
  // console.log(result);
    if (result) {
      res.status(201).json(result);
    }else{
        res.status(401).json({message:"data con"});
    }
  client.close();
}
