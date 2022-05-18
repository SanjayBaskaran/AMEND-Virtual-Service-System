import * as React from 'react';
import {useNavigate} from 'react-router-dom';
// import Signup from './Signup';
function Home (){
    let navigate = useNavigate();
    return(
        <div align="center">This is a Home Page. Please Sign in
         <button onClick={
             () =>{
                 navigate('./Signin');
                 }
                 }>Sign-up</button>
         <button>Sign-in</button>
        </div>     
    );
}

export default Home;