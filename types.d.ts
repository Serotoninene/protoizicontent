export type Tier = {
  name: string;
  id: string;
  priceMonthly: string;
  description: string;
  features: string[];
  mostPopular: boolean;
  productId?: string;
};
