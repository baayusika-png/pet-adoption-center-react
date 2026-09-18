const CREATE_PAYMENT = import.meta.env.VITE_PAYMENT;
const STRIPE_PAYMENT = import.meta.env.VITE_STRIPE_PAYMENT;

// Create a payment record for an existing order
export async function createPayment(
  orderId,
  paymentMethod,
  token,
) {
  // Send payment information to the backend
  const response = await fetch(CREATE_PAYMENT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      order_id: orderId,
      payment_method: paymentMethod,
    }),
  });

  // Get the response as text first
  const responseText = await response.text();

  // Show backend response in console
  console.log("Create payment raw response:", responseText);

  let result;

  try {
    // Convert JSON response into JavaScript object
    result = JSON.parse(responseText);
  } catch (error) {
    // Show the actual backend response if it is not JSON
    console.error(
      "Create payment returned invalid JSON:",
      responseText,
    );

    throw new Error(
      "Payment API returned an invalid response.",
    );
  }

  // Check whether payment was created successfully
  if (!response.ok || result.status !== "success") {
    throw new Error(
      result.message || "Failed to create payment",
    );
  }

  // Return payment response
  return result;
}

// Start Stripe Checkout
export async function createStripePayment(
  paymentId,
  token,
) {
  // Add payment ID to Stripe API URL
  const url = `${STRIPE_PAYMENT}?payment_id=${paymentId}`;

  // Show URL in console
  console.log("Stripe API URL:", url);

  // Send request to Stripe backend
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Get response as text first
  const responseText = await response.text();

  // Show raw Stripe backend response
  console.log(
    "Stripe raw response:",
    responseText,
  );

  let result;

  try {
    // Convert JSON response into JavaScript object
    result = JSON.parse(responseText);
  } catch (error) {
    // Show actual PHP error
    console.error(
      "Stripe API returned invalid JSON:",
      responseText,
    );

    throw new Error(
      "Stripe API returned a PHP error. Check the console for the actual error.",
    );
  }

  // Check whether Stripe was started successfully
  if (!response.ok || result.status !== "success") {
    throw new Error(
      result.message ||
        "Failed to initiate Stripe payment",
    );
  }

  // Return Stripe response
  return result;
}