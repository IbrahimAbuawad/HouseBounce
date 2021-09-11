import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import signinLogo from "../../assets/27.png";
import { Auth } from "../../context/AuthContext";
import { Redirect } from "react-router";
import {Link} from 'react-router-dom'
import "./signin.css";


function Signin({logged}) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const AuthObject = useContext(Auth);

  function handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;

    setUserInfo ({
      ...userInfo,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    AuthObject.signIn(userInfo.email, userInfo.password);
  }
if(!logged){
    return (
        <div class="signinwrapper">
          <div id="h1">
            <h1>Welcome Back !</h1>
          </div>
          <div class="signinsides">
            <div class="leftsignin">
              <img src={signinLogo} alt="signinLogo" width="500px" />
            </div>
            <div class="rightsignin">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name='email'
                    required={true}
                    onChange={handleChange}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name='password'
                    required={true}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <button
                    type='submit'
                    class="signinbtn"
                  >
                    Sign in
                  </button>
                </Form.Group>
              </Form>
            </div>
          </div>
          <div style={{textAlign:'center'}}>
          <span>You dont have an account </span>
          <Link to='/signup'><span>signUp</span></Link> 
          </div>
        </div>
      );
}
 return <Redirect to='/'/>
}

export default Signin;
