import { MongoClient } from "mongodb";

export default async function AddService(req,res){
    if(req.method === "POST"){
        const data = JSON.parse(req.body);
        const client = await MongoClient.connect("mongodb://localhost:27017/amend");
        const db = client.db();
        const userCollection = db.collection("service");
        const result = await userCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json(result);
    }
}