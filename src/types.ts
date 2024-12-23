export interface ICard {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  like: boolean;
  price: string;
  brand: string;
}

export interface IResponse {
  products: ICard[];
  total: number;
  skip: number;
  limit: number;
}
