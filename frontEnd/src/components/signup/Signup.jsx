import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import signinLogo from "../../assets/114.png";
import { Auth } from "../../context/AuthContext";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./signup.css";
function Signup({ logged }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "user",
  });
  const AuthObject = useContext(Auth);

  function handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(userInfo.role==='user'){
console.log('inside user user');
        AuthObject.userSignUp(userInfo.email, userInfo.password,userInfo.firstName,userInfo.lastName);
    }
    else{
        console.log('inside admin admin');

        AuthObject.adminSignUp(userInfo.email, userInfo.password,userInfo.firstName,userInfo.lastName);
    }
  }

  if (!logged) {
    return (
      <div class="signinwrapper">
        <div id="h1">
          <h1>Thank you for trust us !</h1>
        </div>
        <div class="signinsides">
          <div class="leftsignin">
            <img src={signinLogo} alt="signinLogo" width="500px" />
          </div>
          <div class="rightsignin">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your first name"
                  name="firstName"
                  required={true}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your last name"
                  name="lastName"
                  required={true}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
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
                  name="password"
                  required={true}
                  onChange={handleChange}
                />
              </Form.Group>
              <div class="btn_role_wrapper">
                <Form.Group className="role">
                  <Form.Select name="role" onChange={handleChange}>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <button type="submit" class="signinbtn">
                    Sign up
                  </button>
                </Form.Group>
              </div>
            </Form>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <span>You already have an account </span>
          <Link to="/signin">
            <span>Sign in</span>
          </Link>
        </div>
      </div>
    );
  }
  return <Redirect to="/" />;
}

export default Signup;
