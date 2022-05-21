export default function otpverify(){
    const handleSubmit = (event)=>{
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetch("/api/otp",{
            method:"POST",
            body: JSON.stringify({mobile:data.get("mobile")}) 
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
    };
    return (
        <form method="POST" onSubmit={handleSubmit}>
            Mobile : <input type="number" name="mobile"/>
            <input type="Submit"></input>
        </form>
    )
}