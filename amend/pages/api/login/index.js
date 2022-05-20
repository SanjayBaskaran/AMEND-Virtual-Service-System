import { MongoClient } from "mongodb";

export default async function SignUp(req,res){
    if(req.method === "POST"){
        const data = JSON.parse(req.body);
        const client = await MongoClient.connect("mongodb+srv://amend:amend@amend.r8ijt.mongodb.net/user?retryWrites=true&w=majority");
        const db = client.db();

        const userCollection = db.collection("user");
        const result = await userCollection.findOne({email:data.email,password:data.password});
        console.log(result);
        client.close();
        if(result)
            res.status(201).json({message:"User found"});
        else
            res.status(401).json({message:"User Credentials doesn't match"});
    }
}