export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate the items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate the shipping price | If items price is greater than 100, shipping is free | If not, shipping is 10
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calculate the tax price | Tax is 15% of the items price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calculate the total price | Total price is the sum of the items price, shipping price and tax price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  // Save the cart to localStorage | Future Development would like to have a Hybrid Storage where Verified Users shopping carts are stored on DB and anonymous users carts are stored via localStorage.
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
