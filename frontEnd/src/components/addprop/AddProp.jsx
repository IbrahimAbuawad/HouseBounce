import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import signinLogo from "../../assets/114.png";
import { Auth } from "../../context/AuthContext";
import { Prop } from "../../context/PropContext";

import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import "./addprop.css";

// ownerId: { type: String, required: true, },
// ownerName: { type: String, required: true },
// houseDescription: { type: String, required: true },
// salePrice: { type: Number, required: true },
// location: { type: String, required: true },
// size: { type: String, required: true, default: 'normal', enum: ['dublex', 'normal'] },
// reqStatus: { type: String, required: true, default: 'pending', enum: ['pending', 'approved', 'rejected'] }

function AddProp({ logged }) {
  const [propInfo, setPropInfo] = useState({
    houseDescription: "",
    salePrice: 1,
    location: "",
    size: "normal",
  });
  const AuthObject = useContext(Auth);
  const PropObject = useContext(Prop);

  function handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;

    setPropInfo({
      ...propInfo,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    PropObject.addProp(
      propInfo.houseDescription,
      propInfo.salePrice,
      propInfo.location,
      propInfo.size
    );
  }

  if (!logged) {
    return (
      <div class="addPropWrapper">
        <div id="h1">
          <h1>Add Property</h1>
        </div>
        <div class="rightsignin">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>House location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your location"
                name="location"
                required={true}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Label>house Description</Form.Label>

            <Form.Group className="mb-3">
              <textarea
                rows="3"
                placeholder="houseDescription"
                name="houseDescription"
                required={true}
                onChange={handleChange}
              ></textarea>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>sale Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                name="salePrice"
                min="1"
                required={true}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="mb-3">
              <Form.Check
                inline
                label="normal"
                value="normal"
                type="radio"
                name="size"
                required={true}

                onChange={handleChange}
              />
              <Form.Check
                inline
                label="duplex"
                value="duplex"
                name="size"
                type="radio"
                required={true}

                onChange={handleChange}
              />
            </div>

            <Form.Group className="mb-3">
              <button type="submit" class="signinbtn">
                Add Property
              </button>
            </Form.Group>
          </Form>
        </div>
      </div>
    );
  }
  return <Redirect to="/" />;
}

export default AddProp;
