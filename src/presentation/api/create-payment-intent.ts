import * as yup from "yup";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { handleError } from "../../domain/errors/handle-error";
import {
  CreatePaymentIntentUseCase,
  CreatePaymentIntentUseCaseInterface,
} from "../../domain/use.cases/create-payment-intent.use-case";

const HEADERS = {
  "content-type": "application/json",
};

const requestSchema = yup.object().shape({
  body: yup
    .object()
    .shape({
      amount: yup.number().required(),
    })
    .required(),
});

const CreatePaymentIntentHandler =
  ({
    createPaymentIntentUseCase,
  }: {
    createPaymentIntentUseCase: CreatePaymentIntentUseCaseInterface;
  }) =>
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      await requestSchema.validate(
        {
          body: JSON.parse(event.body as string),
        },
        { abortEarly: false }
      );

      const { amount } = JSON.parse(event.body as string);

      const product = await createPaymentIntentUseCase.execute({
        amount,
      });

      return {
        statusCode: 201,
        headers: HEADERS,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return handleError(error);
    }
  };

const createPaymentIntentUseCase = CreatePaymentIntentUseCase();

export const createPaymentIntentHandler = CreatePaymentIntentHandler({
  createPaymentIntentUseCase,
});
export const handler = createPaymentIntentHandler;
