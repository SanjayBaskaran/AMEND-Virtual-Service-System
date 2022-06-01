import jsonwebtaken from 'jsonwebtoken';
export default async function jwtCreation(req,res){
    const data = JSON.parse(req.body)
    console.log(data)
    let token =jsonwebtaken.sign({email:data.email},"SECRET_CODE_USER_LOGIN",{ expiresIn: "1h" })
    res.json({  token: token });
}