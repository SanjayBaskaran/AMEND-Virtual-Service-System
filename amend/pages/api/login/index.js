import { MongoClient } from "mongodb";

export default async function SignUp(req,res){
    if(req.method === "POST"){
        const data = JSON.parse(req.body);
        const client = await MongoClient.connect("mongodb+srv://amend:amend@amend.r8ijt.mongodb.net/user?retryWrites=true&w=majority");
        const db = client.db();

        const userCollection = db.collection("user");
        const result = await userCollection.findOne({});
        console.log(result);
        client.close();
        res.status(201).json({message:"User Created"});
    }
}