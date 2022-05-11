import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Profile from './Login/Profile';
import Signin from './Login/Signin';
import Signup from './Login/Signup';
import Home from './Login/Home';
// import Error from './Login/Errorpage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Home" element={<Home />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </Router>
      );
}

export default App;
