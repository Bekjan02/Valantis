export interface IItem {
  brand: string | null;
  id: string;
  price: number;
  product: string;
}

export interface IItems {
  result: IItem[];
}
