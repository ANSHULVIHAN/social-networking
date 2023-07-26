import React, { useState } from "react";
import { GoogleSignInAPI, LoginAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/1.png";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import GoogleButton from 'react-google-button';

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Sharing Thoughts with World</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
        <hr className="hr-text" style={{display : 'none'}} data-content="or" />
      <div className="google-btn-container" style={{ display: 'none' }}><GoogleButton className="google-btn" onClick={GoogleSignInAPI}/></div>      
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to Confession App?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}










/*import React, { useState } from "react";
import { GoogleSignInAPI, LoginAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/1.png";
import { useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
import GoogleButton from 'react-google-button';

export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Sharing Thoughts with World</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container"  ><GoogleButton className="google-btn" onClick={GoogleSignInAPI}/></div>
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to Confession App?{" "}
          <span className="join-now" onClick={() => navigate("/register")}>
            Join now
          </span>
        </p>
      </div>
    </div>
  );
}; */




/*import React, { useState } from "react";
import { GoogleSignInAPI, LoginAPI } from "../api/AuthAPI";
import LinkedinLogo from "../assets/1.png";
import {  useNavigate } from "react-router-dom";
import "../Sass/LoginComponent.scss";
import { toast } from "react-toastify";
//import { navigate } from "../helpers/useNavigate";
import GoogleButton from 'react-google-button';

export default function LoginComponent() {
 const navigate = useNavigate();
  const [credentails, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentails.email, credentails.password);
      toast.success("Signed In to Linkedin!");
      localStorage.setItem("userEmail", res.user.email);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedinLogo" />

      <div className="login-wrapper-inner">
        <h1 className="heading">Sign in</h1>
        <p className="sub-heading">Stay updated on your professional world</p>

        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, email: event.target.value })
            }
            type="email"
            className="common-input"
            placeholder="Email or Phone"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentails, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password"
          />
        </div>
        <button onClick={login} className="login-btn">
          Sign in
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container"  ><GoogleButton className="google-btn" onClick={GoogleSignInAPI}/></div>
      <div className="google-btn-container">
        <p className="go-to-signup">
          New to LinkedIn?{" "}

          <span className="join-now" onClick={() => navigate('/register')}>
        Join Now
      </span>
         </p>
      </div>
    </div>
  );
}
*/