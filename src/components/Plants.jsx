import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

export default function Plants() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getPlants = async () => {
      setLoading(true);
      const response = await fetch("https:spruce-moose-backend.onrender.com/plant");
      console.log(response)
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }
      return () => {
        componentMounted = false;
      };
    };
    getPlants();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>

        <div className="col-md-3">
          <Skeleton height={350} />
        </div>

        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };
  const filterPlant = (category) => {
    const updatedList = data.filter((x) => x.category === category);
    setFilter(updatedList);
  };
  const ShowPlants = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterPlant("ornamental")}
          >
            Ornamental Plants
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterPlant("fruit")}
          >
            Fruit Trees
          </button>
        </div>
        {filter.map((plant) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={plant.id}>
                  <img
                    src={plant.image}
                    height="250px"
                    className="card-img-top"
                    alt={plant.commonName}
                  />
                  <div className="card-body">
                    <h5 className="card-title mb-0">
                      {plant.commonName.substring(0, 12)}...
                    </h5>
                    <p className="card-text lead fw-bold">₹{plant.price}</p>
                    <NavLink
                      to={`/plants/${plant._id}`}
                      className="btn  btn-outline-dark"
                    >
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Plants</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowPlants />}
        </div>
      </div>
    </>
  );
}
