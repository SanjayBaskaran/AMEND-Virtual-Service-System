export default async function sendOtp(req, res) {
  if (req.method === "POST") {
    console.log("In ");
    const data = JSON.parse(req.body);
    
    const options = {
      method: "POST",
      url: "https://d7-verify.p.rapidapi.com/send",
      headers: {
        "content-type": "application/json",
        Authorization: "undefined",
        "X-RapidAPI-Host": "d7-verify.p.rapidapi.com",
        "X-RapidAPI-Key": "056bd7e52bmsh0c3d1f1335e4e63p18bd46jsnc51e3f16a451",
      },
      data: '{"expiry":900,"message":"Your otp code is {code}","mobile":971562316353,"sender_id":"SMSInfo"}',
    };
  }
}
