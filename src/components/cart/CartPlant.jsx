import React from "react";
import { addCart, delCart, rmvCart } from "../../redux/action";
export default function CartPlant({ cartPlant, dispatch }) {
  const handleRemove = () => {
    dispatch(rmvCart(cartPlant));
  };
  const handleReduce = (e) => {
    if (cartPlant.qty === 0) return;
    dispatch(delCart(cartPlant));
  };
  const handleAdd = () => {
    dispatch(addCart(cartPlant));
  };

  return (
    <div className="cartPlantContainer row">
      <img
        src={cartPlant.image}
        className="img-fluid col-3 p-2"
        alt={cartPlant.title}
      />
      <div className="cartPlantDescription col-7 p-2">
        <p>{cartPlant.title}</p>
        <p>
          Quantity:
          <br />
          <button className="btn btn-light" onClick={handleReduce}>
            -
          </button>
          <span> {cartPlant.qty}</span>{" "}
          <button className="btn btn-light" onClick={handleAdd}>
            +
          </button>
        </p>
        <p>Item - Price: ₹ {cartPlant.price}</p>
        <p>Sub - Total: ₹ {cartPlant.sub_total}</p>
      </div>
      <div
        className="col-md-2 d-flex p-2"
        style={{ flexDirection: "column", justifyContent: "space-around" }}
      >
        <button className="btn btn-outline-danger" onClick={handleRemove}>
          Remove
        </button>
        {/* <button className="btn btn-light">Buy Now</button> */}
      </div>
    </div>
  );
}
