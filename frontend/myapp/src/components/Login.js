import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken, RemoveToken] = useCookies(["mytoken"]);

  let history = useNavigate();
  useEffect(() => {
    if (token["mytoken"]) {
      history("/tasks");
    }
  }, [token]);

  const userLogin = () => {
    APIService.loginUser(
      { username: username, password: password },
      token
    ).then((resp) => setToken("mytoken", resp.data.token));
  };

  const userRegister = () => {
    APIService.registerUser({
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      email: email,
    })
      .then((resp) => {
        userLogin();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      {isLogin ? (
        <div>
          {" "}
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
            <label className="form-label">Password</label>
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
        </div>
      ) : (
        <div>
          <h2>Register</h2>
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
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>{" "}
        </div>
      )}

      {isLogin ? (
        <button className="btn btn-primary" onClick={userLogin}>
          Login
        </button>
      ) : (
        <button className="btn btn-primary" onClick={userRegister}>
          Register
        </button>
      )}
      {isLogin ? (
        <p>
          New User ?{" "}
          <a className="link-primary" onClick={() => setIsLogin(false)}>
            Register now
          </a>
        </p>
      ) : (
        <p>
          Already logged in?{" "}
          <a className="ink-primary" onClick={() => setIsLogin(true)}>
            Login now
          </a>
        </p>
      )}
    </div>
  );
}

export default Login;
