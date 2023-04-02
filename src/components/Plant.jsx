import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function Plant() {

  const { id } = useParams();
  const [plant, setPlant] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addPlant = (plant) => {
    dispatch(addCart(plant));
  };

  useEffect(() => {
    const getPlant = async () => {
      setLoading(true);
      const response = await fetch(`spruce-moose-backend.onrender.com/plant/${plant._id}`);
      setPlant(await response.json());
      setLoading(false);
    };
    getPlant();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };
  const ShowPlant = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={plant.imgUrl}
            alt={plant.commonName}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{plant.scientificName}</h4>
          <h1 className="display-5">{plant.commonName}</h1>
          <p className="lead fw-bolder">
            Category: {plant.category}
            Size: {plant.size}
            <i className="fa fa-star"></i>
          </p>
<<<<<<< Updated upstream
          <h3 className="display-6 fw-bold my-4">$ {plant.price}</h3>
=======
          <h3 className="display-6 fw-bold my-4">${plant.price}</h3>
>>>>>>> Stashed changes
          <p className="lead">{plant.commonName}</p>
          <button
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => {
              addPlant(plant);
            }}
          >
            Add to cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">
            Go to cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowPlant />}
        </div>
      </div>
    </>
  );
}
