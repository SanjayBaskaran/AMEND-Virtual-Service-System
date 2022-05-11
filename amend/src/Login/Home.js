import * as React from 'react';
import {useHistory} from 'react-router-dom';
import Signup from './Signup';
function Home (){
    let history = useHistory();
    return(
        <div align="center">This is a Home Page. Please Sign in
         <button onClick={
             () =>{
                 history.push('./Signin');
                 }
                 }>Sign-up</button>
         <button>Sign-in</button>
        </div>     
    );
}

export default Home;