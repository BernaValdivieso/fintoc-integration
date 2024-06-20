import { PaymentIntent } from "../entities/payment-intent.entity";
import { createPaymentIntentGateway } from "../gateways/create-payment-intent.gateway";

interface CreatePaymentIntentUseCaseParams {
  amount: number;
}

export interface CreatePaymentIntentUseCaseInterface {
  execute: (params: CreatePaymentIntentUseCaseParams) => Promise<PaymentIntent>;
}

export const CreatePaymentIntentUseCase =
  (): CreatePaymentIntentUseCaseInterface => ({
    execute: async ({ amount }: CreatePaymentIntentUseCaseParams) => {
      const paymentIntent = await createPaymentIntentGateway({
        paymentAmount: amount,
      });

      return paymentIntent;
    },
  });
