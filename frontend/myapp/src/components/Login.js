import React, { useState } from "react";
import APIService from "../APIService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = () => {
    APIService.loginUser({ username: username, password: password }).then(
      (resp) => console.log(resp)
    );
  };
  return (
    <div className="App">
      <h2>Login</h2>
      <div className="mb-3">
        <label className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={userLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;
