import { Product } from '@/features/product/types/Product';

export const products: Product[] = [
  {
    name: 'E-book',
    description: 'A comprehensive guide to mastering web development.',
    priceId: 'price_1PmQFQJt0BdRfTXvOr29mm6d',
    productId: 'prod_QdheVGXMjZOnMp',
    amount: '1999', // $19.99
  },
  {
    name: 'Online Course',
    description: 'A 12-week course on advanced JavaScript techniques.',
    priceId: 'price_1PmQG6Jt0BdRfTXvbKY0WmjV',
    productId: 'prod_QdhfR1hszyp5lW',
    amount: '4999', // $49.99
  },
  {
    name: 'Awesome Credits x 5',
    description: '500 credits to use on our platform.',
    priceId: 'price_1Q2DcpJt0BdRfTXvPQ2cHe3X',
    productId: 'prod_Qu1gT1TEHPz6Kl',
    amount: '3000',
    repurchasable: true,
    tokens: 5,
  },
  {
    name: 'Awesome Credits x 10',
    description: '500 credits to use on our platform.',
    priceId: 'price_1Q2DbVJt0BdRfTXv2IinfxIv',
    productId: 'prod_Qu1eq5NGBGS0A7',
    amount: '5000',
    repurchasable: true,
    tokens: 10,
  },
];
