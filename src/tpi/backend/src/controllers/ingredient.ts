import { Request, Response } from 'express'
import Ingredient from '../models/ingredient'

export const getIngredients = async (req: Request, res: Response) => {
  const listIngredients = await Ingredient.findAll()

  res.json(listIngredients)
}

export const getIngredient = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ingredient = await Ingredient.findByPk(id)

  if (ingredient) {
    res.json(ingredient)
  } else {
    res.status(404).json({
      msg: `No existe un ingrediente con el id ${id}`
    })
  }
}

export const deleteIngredient = async (req: Request, res: Response) => {
  const { id } = req.params
  const ingredient = await Ingredient.findByPk(id)

  if (!ingredient) {
    res.status(404).json({
      msg: `No existe un ingrediente con el id ${id}`
    })
  } else {
    await ingredient.destroy();
    res.json({
      msg: 'El ingrediente fue eliminado con exito!'
    })
  }
}

export const postIngredient = async (req: Request, res: Response) => {
  const { body } = req

  try {
    await Ingredient.create(body)

    res.json({
      msg: `El ingrediente fue agregado con exito!`
    })
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Upps, ocurrio un error :('
    })
  }

}

export const updateIngredient = async (req: Request, res: Response) => {
  const { body } = req
  const { id } = req.params

  try {
    const ingredient = await Ingredient.findByPk(id)

    if (ingredient) {
      await ingredient.update(body)
      res.json({
        msg: 'El producto fue actualizado con exito!'
      })
    } else {
      res.status(404).json({
        msg: `No existe un ingrediente con el id ${id}`
      })
    }
  } catch (error) {
    console.log(error)
    res.json({
      msg: 'Upps, ocurrio un error :('
    })
  }
}