const CREATE_ORDER = import.meta.env.VITE_CREATE_ORDER;
const GET_ORDER = import.meta.env.VITE_GET_ORDER;
const CHECKOUT = import.meta.env.VITE_CHECKOUT;
const CANCELORDER = import.meta.env.VITE_CANCEL_ORDER;

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
export const getOrders = async (token, page = 1) => {
  //Send GET request to the order API
  const response = await fetch(`${GET_ORDER}?page=${page}&limit=10`, {
    //Only 10 order per page
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //Convert server response from JSON format to JS object
  const data = await response.json();

  //Check whether the request was sucessful
  if (!response.ok || data.status !== "success") {
    throw new Error(data.message || "Failed to fetch orders");
  }

  return data; //Return the order data
};

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

// Cancel an order
export const cancelOrder = async (token, orderId) => {
  //Send PATCH request to cancel the selected order
  const response = await fetch(`${CANCELORDER}?order_id=${orderId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  //Convert the server response into JSON data
  const data = await response.json();

  //Check if the request failed
  if (!response.ok || data.status !== "success") {
    throw new Error(data.message || "Failed to cancel order");
  }

  return data; //Return sucessful cancellation response
};
