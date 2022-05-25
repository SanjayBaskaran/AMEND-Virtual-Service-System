export default async function SignUp(req,res){
    if(req.method === "POST"){
        const data = JSON.parse(req.body);
        const response = await fetch("http://localhost:5000/Home",{
            method:"POST",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({semail:data.semail,msg:data.msg})
          }).then((res)=>{
            console.log(res);
          }).catch((err)=>{
            console.log(err);
          });
          return res.status(200).json({"msg":response});
    }
}