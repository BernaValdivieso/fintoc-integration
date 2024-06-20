export type PaymentIntent = {
  id: string;
  object: string;
  amount: number;
  currency: string;
  widget_token: string;
  status: string;
  metadata: Record<string, unknown>;
  reference_id: string | null;
  recipient_account: {
    holder_id: string;
    number: string;
    type: string;
    institution_id: string;
  };
  sender_account: null;
  created_at: string;
};
