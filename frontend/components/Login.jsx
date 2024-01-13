import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsern] = useState();
  const [password, SetPass] = useState();
  const navigate = useNavigate();

  const handleLogin = () => {
    axios
      .post("http://localhost:8000/login", { username, password })
      .then((user) => {
        localStorage.setItem("token", user.data.token)
        console.log("login successfull");
        // console.log(user);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h2>login page</h2>
      <input
        type="text"
        placeholder="enter username"
        value={username || ""}
        onChange={(e) => {
          setUsern(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="enter password"
        value={password || ""}
        onChange={(e) => {
          SetPass(e.target.value);
        }}
      />
      <button type="submit" onClick={handleLogin}>
        login
      </button>
    </div>
  );
};

export default Login;
