// import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Login from "./Login";
import CartPlant from "./cart/CartPlant";

export default function Checkout() {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();
  let total = 0;
  if (state.loggedIn === false) {
   return (
      <Login />
   )
  return (
    <div className="cartContainer container">
      <div className="row">
        <div className="col-md-6">
          {state?.map((cartPlant) => {
            return (
              <CartPlant cartPlant={cartPlant} dispatch={dispatch} />
            );
          })}
          {state.length === 0 && (
            <div className="emptyCart container text-center">
              <h1 className="row heading m-3 text-center">
                {" "}
                Your Cart is Empty...!
              </h1>
              <div className="row text-center">
                <Link to="./plants" className="btn btn-large btn-primary">
                  Start Shopping...
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6 statusContainer">
          <h2>Cart Status</h2>
          {state.map((x) => {
            total += x.sub_total;
          })}
          <div className="total"> $ {parseFloat(total).toFixed(2)}</div>
        </div>
        <NavLink to="/checkout" className="btn btn-dark ms-2 px-3 py-2">
            Checkout
          </NavLink>
      </div>
    </div>
  );
}
};