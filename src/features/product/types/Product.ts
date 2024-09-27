export interface Product {
  name: string;
  description: string;
  priceId: string;
  amount: string;
  productId: string;
  repurchasable?: boolean;
  tokens?: number;
}
