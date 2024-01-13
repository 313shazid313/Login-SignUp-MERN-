import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();


  const handleRegister = () => {
    axios
      .post("http://localhost:8000/register", { username, password })
      .then(() => {
        console.log("User is registered");
        navigate('/login');
      })
      .catch((err)=>{
        console.log(err);
        navigate('/register')
      })
  };

  return (
    <div>
      <h1>register page</h1>

      <input
        type="text"
        placeholder="username"
        value={username||""}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        id="username"
        required
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password ||""}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        
        id="password"
      />
      <button type="submit" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Registration;
