import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

export default function Contact() {
  return (
    <>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Contact Us</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <img
              className="card-img-top"
              src="../../assets/location.png"
              alt="Location"
            />
          </div>
          <div className="col-md-6 contact-links">
            <div className="contact-link">
              <img src="../../assets/email.png" alt="email" />
              <a href="#">spruce@moose.com</a>
            </div>
            <div className="contact-link">
              <img src="../../assets/phone.png" alt="telephone" />
              <a href="#">(208) 932 2349</a>
            </div>
            <div className="contact-link">
              <img src="../../assets/locations.png" alt="location" />
              <a href="#">555 main st, Rexburg, ID 83440</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
