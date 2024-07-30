export type Tier = {
  name: string;
  id: string;
  priceMonthly: string;
  description: string;
  features: string[];
  mostPopular: boolean;
  productId?: string;
};

export type Quote = {
  setup: string;
  inBetween: string;
  conclusion: string;
};

export type AIAnswer = {
  quotes: Quote[];
};
