import { Ingredient } from "./ingredient.model";
import { User } from "./user.model";

export interface Recipe {
  id: number,
  title: string,
  ingredients: Ingredient[],
  imageUrl: string,
  steps: string,
  user: User
}