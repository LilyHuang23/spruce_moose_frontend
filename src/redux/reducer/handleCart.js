const cart = [];

const handleCart = (state = cart, action) => {
  const plant = action.payload;

  switch (action.type) {
    case "ADDITEM":
      // Check plant is exists
      const exist = state.find((x) => x._id === plant._id);
      if (exist) {
        // Increase Quantity
        return state.map((x) =>
          x._id === plant._id ? { ...x, qty: x.qty + 1, sub_total: (x.qty + 1) * x.price } : x
        );
      }

      return [
        ...state,
        {
          ...plant,
          qty: 1,
          sub_total: plant.price
        },
      ];

    case "DELITEM":
      const exist1 = state.find((x) => x._id === plant._id);
      if (exist1.qty === 1) {
        return state.filter((x) => x._id !== exist1._id);
      } else {
        return state.map((x) =>
          x._id === plant._id ? { ...x, qty: x.qty - 1, sub_total: (x.qty - 1) * x.price } : x
        );
      }

    case "RMVITEM":
      const exist2 = state.find((x) => x._id === plant._id);
      if (exist2.qty) {
        return state.filter((x) => x._id !== exist2._id);
      }

    default:
      return state;
      
  }
};

export default handleCart;
