const CREATE_ORDER = import.meta.env.VITE_CREATE_ORDER;
const GET_ORDER = import.meta.env.VITE_GET_ORDER;
const CHECKOUT = import.meta.env.VITE_CHECKOUT;

//Create a new order
export async function createOrder(orderData, token) {
  //Send the order data to backend
  const response = await fetch(CREATE_ORDER, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, //Send user's login token
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  const result = await response.json();

  //Check if the order was created sucessfully
  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to place order");
  }

  return result; //Return the sucessful order result
}

//Get all order of the logged in user
export async function getOrders(token) {
  //Request the user's orders
  const response = await fetch(GET_ORDER, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  //Check if order were fetched sucessfully
  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to fetch orders");
  }

  return result; //Return the orders data
}

//Get the details needed for checkout
export async function getCheckoutDetails(foodId, quantity, token) {
  //Send food Id and quantity
  const response = await fetch(CHECKOUT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    //Send the selected food and quantity
    body: JSON.stringify({
      food_id: foodId,
      quantity: quantity,
    }),
  });

  const result = await response.json();

  //Check if the checkout details were loaded sucessfully
  if (!response.ok || result.status !== "success") {
    throw new Error(result.message || "Failed to load checkout details");
  }

  return result; //Return the checkout details
}
