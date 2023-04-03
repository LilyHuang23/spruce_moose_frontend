import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


export default function Register() {

const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");

const registerUser = async () => {
  const response = await fetch("https://spruce-moose-backend.onrender.com/user/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
    }),
  });
}
  return (
    <>
      <h1 className="display-1 text-center m-4">Register</h1>
      <div className="container">
        <form className="=g-3 needs-validation" novalidate>
          <div className="col-md-4">
            <label for="validationCustom01" className="form-label">
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              placeholder="First Name"
              value=""
              required
            />
          </div>
          <div className="col-md-4">
            <label for="validationCustom02" className="form-label">
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom02"
              placeholder="Last Name"
              onChange={() => setFirstName()}
              required
            />
          </div>
          <div className="col-12 m-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                onChange={() => setLastName()}
                id="invalidCheck"
                required
              />
              <label className="form-check-label" for="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="button" onClick="{registerUser}">
              Register Now
            </button>
          </div>
        </form>{" "}
      </div>
    </>
  );
}
