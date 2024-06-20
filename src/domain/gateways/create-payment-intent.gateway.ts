import { PaymentIntent } from "../entities/payment-intent.entity";

const FINTOC_API_KEY = process.env.FINTOC_API_KEY;

export const createPaymentIntentGateway = async ({
  paymentAmount,
}: {
  paymentAmount: number;
}): Promise<PaymentIntent> => {
  const payment_intent = {
    amount: paymentAmount,
    currency: "clp",
    customer_email: "name@example.com",
  };

  const result = await fetch("https://api.fintoc.com/v1/payment_intents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${FINTOC_API_KEY}`,
    },
    body: JSON.stringify(payment_intent),
  });

  return result.json() as unknown as PaymentIntent;
};
