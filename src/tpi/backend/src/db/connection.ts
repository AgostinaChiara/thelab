import { Sequelize } from 'sequelize-typescript';
import Recipe, { RecipeIngredients } from '../models/recipe';
import Ingredient from '../models/ingredient';
import { User } from '../models/user';

const sequelize = new Sequelize({
  database: 'recipes',
  username: 'root',
  password: 'root',
  host: 'localhost',
  dialect: 'mysql',
  models: [Recipe, RecipeIngredients, Ingredient, User]
});

export default sequelize;