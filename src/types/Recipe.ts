export interface Ingredient {
  name: string;
  baseAmount: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
}