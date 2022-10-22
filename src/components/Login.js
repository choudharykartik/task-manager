import React, { useState, useEffect } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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
    APIService.loginUser({ username: username, password: password }, token)
      .then((resp) => setToken("mytoken", resp.data.token))
      .catch((resp) => {
        console.log(resp.response.data[Object.keys(resp.response.data)[0]]);
        toast.error("Invalid login Credentials.");
      });
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
      .catch((resp) =>
        toast.error(resp.response.data[Object.keys(resp.response.data)[0]])
      );
  };
  const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

  const LoginFormButton = (props) => (
    <div id="loginbutton" className="loginrow">
      <button onClick={userLogin}>{props.title}</button>
    </div>
  );
  const RegisterFormButton = (props) => (
    <div id="registerbutton" className="loginrow">
      <button onClick={userRegister}>{props.title}</button>
    </div>
  );

  return (
    <div id="loginform">
      <Toaster />
      {isLogin ? (
        <>
          <FormHeader title="Login" />
          <div>
            <div className="loginrow">
              <label>Username</label>
              <input
                id="username"
                key="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="loginrow">
              <label>Password</label>
              <input
                id="password"
                key="password"
                placeholder="Enter your password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <FormHeader title="Register" />
          <div className="loginrow">
            <label>Username</label>
            <input
              id="username"
              key="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="loginrow">
            <label>Email</label>
            <input
              placeholder="Enter your Email"
              type="email"
              id="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="loginrow">
            <label>First Name</label>
            <input
              placeholder="Enter your First Name"
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="loginrow">
            <label>Last Name</label>
            <input
              placeholder="Enter your Last Name"
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="loginrow">
            <label>Password</label>
            <input
              id="password"
              key="password"
              placeholder="Enter your password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </>
      )}

      {isLogin ? (
        <LoginFormButton title="Log in" />
      ) : (
        <RegisterFormButton title="Register" />
      )}
      {isLogin ? (
        <div id="alternativeLogin">
          <label>
            New User ?{" "}
            <a className="link-primary" onClick={() => setIsLogin(false)}>
              Register now
            </a>
          </label>
        </div>
      ) : (
        <div id="alternativeLogin">
          <label>
            Already logged in?{" "}
            <a className="ink-primary" onClick={() => setIsLogin(true)}>
              Login now
            </a>
          </label>
        </div>
      )}
    </div>
  );
}

export default Login;
