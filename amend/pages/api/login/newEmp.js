import { MongoClient } from "mongodb";

export default async function SignUp(req,res){
    if(req.method === "POST"){
        console.log("In ");
        const data = JSON.parse(req.body);
        const client = await MongoClient.connect("mongodb://localhost:27017/emp");
        const db = client.db();

        const userCollection = db.collection("user");
        const result = await userCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json(result);
    }
}