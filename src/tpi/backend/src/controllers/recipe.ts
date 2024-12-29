import { Request, Response } from 'express';
import Recipe, { RecipeIngredients } from '../models/recipe';
import Ingredient from '../models/ingredient';
import { User } from '../models/user';
import { Op } from 'sequelize';
import sequelize from '../db/connection';

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const { title, steps, imageUrl, ingredients, userId } = req.body;

    const recipe = await Recipe.create({ title, steps, imageUrl, userId });

    if (ingredients && ingredients.length > 0) {
      const ingredientInstances = await Ingredient.findAll({
        where: { id: ingredients },
      });

      if (ingredientInstances.length > 0) {
        await recipe.$set('ingredients', ingredientInstances);
      } else {
        return res.status(404).json({ error: 'No se encontraron ingredientes con los ids' });
      }
    }

    res.status(201).json({ msg: 'La receta se creo con exito!', recipe });
  } catch (error) {
    res.status(500).json({ error: 'Upps, ocurrio un error :(' });
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByPk(id);

    if (recipe) {
      const t = await sequelize.transaction();

      try {
        await recipe.update({
          title: body.title,
          imageUrl: body.imageUrl,
          steps: body.steps,
          userId: body.userId
        }, { transaction: t });

        await RecipeIngredients.destroy({
          where: { recipeId: id },
          transaction: t
        });

        if (body.ingredients && body.ingredients.length > 0) {
          const ingredientRelations = body.ingredients.map((ingredientId: number) => ({
            recipeId: parseInt(id),
            ingredientId: ingredientId
          }));

          await RecipeIngredients.bulkCreate(ingredientRelations, { transaction: t });
        }

        await t.commit();

        res.status(200).json({
          msg: 'La receta se actualizo con exito!'
        });
      } catch (error) {
        await t.rollback();
        throw error;
      }
    } else {
      res.status(404).json({
        msg: 'No se encontro la receta'
      });
    }
  } catch (error) {
    res.status(500).json({
      error: 'Upps, ocurrio un error :('
    });
  }
};

export const getRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await Recipe.findAll({
      include: [Ingredient, User]
    });

    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ error: 'Upps, ocurrio un error :(' });
  }
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByPk(id, {
      include: [Ingredient, User]
    });

    if (!recipe) {
      return res.status(404).json({ error: 'No se encontro la receta' });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Upps, ocurrio un error :(' });
  }
};

export const getRecipesByIngredients = async (req: Request, res: Response) => {
  const { ingredients } = req.body

  try {
    const recipes = await Recipe.findAll({
      include: [{
        model: Ingredient,
      }, User],
      where: {
        id: {
          [Op.in]: sequelize.literal(`(
            SELECT r.id
            FROM recipes r
            JOIN recipeingredients ri ON r.id = ri.recipeId
            WHERE ri.ingredientId IN (${ingredients.join(',')})
            GROUP BY r.id
            HAVING COUNT(DISTINCT ri.ingredientId) = ${ingredients.length}
          )`)
        }
      }
    })

    res.status(200).json({ recipes })
  } catch (error) {
    res.status(500).json({ error: 'Upps, ocurrio un error :(' })
  }
}

export const getRecipesByUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const recipes = await Recipe.findAll({
      where: {
        userId: userId
      },
      include: [Ingredient, User]
    })

    res.status(200).json({ recipes })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Upps, ocurrio un error :(' })
  }
}


export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recipe = await Recipe.findByPk(id);

    if (!recipe) {
      return res.status(404).json({ error: 'No se encontro la receta' });
    }

    await recipe.destroy();
    res.status(200).json({ message: 'La receta se elimino con exito' });
  } catch (error) {
    res.status(500).json({ error: 'Upps, ocurrio un error :(' });
  }
};