import { Column, ForeignKey, Model, Table, BelongsToMany, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';
import Ingredient from './ingredient';
import { User } from './user';

@Table({ tableName: 'recipes', timestamps: false })
class Recipe extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  override id!: number;

  @Column
  title!: string;

  @Column
  imageUrl!: string;

  @Column
  steps!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsToMany(() => Ingredient, () => RecipeIngredients)
  ingredients!: Ingredient[];
}

@Table({ tableName: 'recipeingredients', timestamps: false })
export class RecipeIngredients extends Model {
  @ForeignKey(() => Recipe)
  @Column
  recipeId!: number;

  @ForeignKey(() => Ingredient)
  @Column
  ingredientId!: number;

  @Column
  quantity!: number;
}

export default Recipe;