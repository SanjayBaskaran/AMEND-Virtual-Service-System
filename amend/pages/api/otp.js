export default async function sendOtp(req, res) {
  if (req.method === "POST") {
    console.log("In ");
    const data = JSON.parse(req.body);
    const otpdata= {"phone_number":"91"+data.mobile};
    console.log(otpdata);    
    const options = {
      method: 'POST',
      url: 'https://wipple-sms-verify-otp.p.rapidapi.com/send',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Host': 'wipple-sms-verify-otp.p.rapidapi.com',
        'X-RapidAPI-Key': '056bd7e52bmsh0c3d1f1335e4e63p18bd46jsnc51e3f16a451'
      },
      data:JSON.stringify(otpdata)
    };
    
    fetch(options).then((response)=>{
      console.log(response);
      return res.status(200).json(response);
    }).catch((err)=>{
      return res.status(200).json(err);
    });
  }
}
