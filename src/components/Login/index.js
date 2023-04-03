import React from 'react'
import { NavLink } from 'react-router-dom'

export default function index() {
  return (
    <>
    <h1 className="display-1 text-center m-4">Login</h1>
      <div className="container">
        <form className="row g-3 needs-validation" novalidate>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <h3 className="mt-4">Don't have an account?</h3>
        <NavLink to="/register" className="btn btn-dark ms-2 px-3 py-2">
            Register
          </NavLink>
      </div>
    </>
  )
}
