import "./Admin.css";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const { siteID } = useParams();

  async function loginUser() {
    try {
      const { data } = await axios.post("/api/users/login", { email, password });
      console.log(data);
      if (data !== undefined) {
        localStorage.setItem("JKJBJWT", data.token);
        navigate(`/site/${siteID}`);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrMsg(error.response.data);
    }
  }

  return (
    <form
      id="login"
      onSubmit={(e) => {
        e.preventDefault();
        loginUser();
      }}
    >
      <p className="error">{errMsg}</p>
      <input
        type="text"
        placeholder="Email Address"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button>Log In</button>
    </form>
  );
};

export default Admin;
