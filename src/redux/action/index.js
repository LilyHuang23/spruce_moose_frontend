// Adding Item to Cart

export const addCart = (plant) =>{
  return {
    type: "ADDITEM",
    payload: plant
  }
}

// Adding Delete to Cart

export const delCart = (plant) =>{
  return {
    type: "DELITEM",
    payload: plant
  }
}

// Remove Item

export const rmvCart = (plant) =>{
  return {
    type: "RMVITEM",
    payload: plant
  }
}


