import { getLocalStorage, setLocalStorage } from "./fetch/utility.js";

export var Cart = {};

Cart.cartItemTemplate = (item) => {
  // console.log(item);
  const newItem = `<li class="cart-card">
<a href="#" class="cart-card__image">
<img
  src="${item.Images.PrimaryMedium}"
  alt="${item.Name}"
/>
</a>
<a href="#">
<h2 class="card__name">${item.Name}</h2>
</a>
<p class="cart-card__color">Color: ${item.Colors[0].ColorName}</p>
<p class="cart-card__quantity">Quantity: ${item.quantity}</p>
<img src="/images/up_arrow.svg" alt="increase quantity" class="increase_quantity" data-id="${item.Id}"/>
<img src="/images/down_arrow.svg" alt="decrease quantity" class="decrease_quantity" data-id="${item.Id}"/>
<p class="cart-card__price">$${item.FinalPrice}</p>
<img src="/images/x_icon.svg" alt="remove item from cart" class="remove_item" data-id="${item.Id}"/>
</li>`;
  return newItem;
};

Cart.init = () => {
    setLocalStorage("cart", []);
};
Cart.addToCart = (product) => {
    let shoppingCart = getLocalStorage("cart");
    if (shoppingCart == null) {
      Cart.init();
      shoppingCart = getLocalStorage("cart");
    }
    // console.log(product);
    let itemInCart = false;
    shoppingCart.forEach((item) => {
      if (item.Id == product.Id) {
        itemInCart = true;
      }
    });
    if (!itemInCart) {
      product["quantity"] = 1;
      shoppingCart.push(product);
    }
    else {
      // console.log("item already in cart");
      shoppingCart.find((item) => item.Id == product.Id).quantity += 1;
    }
    // if the item is already in the cart, don't add it again
    // instead increase the quantity by 1
    setLocalStorage("cart", shoppingCart);
    let total = Cart.calcTotal(shoppingCart);
    setLocalStorage("total", total)
    document.querySelector(".cartAddSuccess").style.display = "block";
    document.querySelector(".cartCount").innerHTML = shoppingCart.length;
    document.querySelector(".cart").classList.add("cartWobble");
    setTimeout(() => {
      document.querySelector(".cart").classList.remove("cartWobble");
    }, 3000);

};
Cart.removeItemType = (id) => {
  const cartItems = getLocalStorage("cart");
  //remove all items with a matching id
  let newCart = cartItems.filter((item) => item.Id != id);
  setLocalStorage("cart", newCart);
  // console.log(newCart);
  let newTotal = Cart.calcTotal(newCart);
  setLocalStorage("total", newTotal);
  Cart.renderCartContents();
}
Cart.increaseItem = (id) => {
  let cartItems = getLocalStorage("cart");
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].Id == id) {
      cartItems[i].quantity += 1;
      break;
    }
  }
  setLocalStorage("cart", cartItems);
  let newTotal = Cart.calcTotal(cartItems);
  setLocalStorage("total", newTotal);
  Cart.renderCartContents();
}

Cart.reduceItem = (id) => {
  let cartItems = getLocalStorage("cart");
  for (let i = 0; i < cartItems.length; i++) {
    if (cartItems[i].Id == id) {
      cartItems[i].quantity -= 1;
      if (cartItems[i].quantity == 0) {
        cartItems.splice(i, 1);
      }
      break;
    }
  }
  setLocalStorage("cart", cartItems);
  let newTotal = Cart.calcTotal(cartItems);
  setLocalStorage("total", newTotal);
  Cart.renderCartContents();
}

Cart.calcTotal = (shoppingCart) => {
  if (shoppingCart == null || shoppingCart.length == 0) {
    return 0;
  }
  let prices = shoppingCart.map((item) => item.FinalPrice * item.quantity);
  return prices.reduce((accumulator, currentValue) => accumulator + currentValue);
}
Cart.renderCartContents = () => {
    const cartItems = getLocalStorage("cart");
    const htmlItems = cartItems.map((item) => Cart.cartItemTemplate(item));
    document.getElementById("cart-list").innerHTML = htmlItems.join("");
    document.querySelectorAll(".remove_item").forEach((item) => {
      item.addEventListener("click", (e) => {
        Cart.removeItemType(e.target.dataset.id);
      });
    });
    document.querySelectorAll(".increase_quantity").forEach((item) => {
      item.addEventListener("click", (e) => {
        Cart.increaseItem(e.target.dataset.id);
      });
    });
    document.querySelectorAll(".decrease_quantity").forEach((item) => {
      item.addEventListener("click", (e) => {
        Cart.reduceItem(e.target.dataset.id);
      });
    });
    document.getElementById("cart-total").innerHTML = `Total: ${getLocalStorage("total")}`;
};