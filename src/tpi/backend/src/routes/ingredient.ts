import { Router } from 'express'
import { deleteIngredient, getIngredient, getIngredients, postIngredient, updateIngredient } from '../controllers/ingredient'

const router = Router()

router.get('/', getIngredients)
router.get('/:id', getIngredient)

router.delete('/:id', deleteIngredient)

router.post('/', postIngredient)

router.put('/:id', updateIngredient)

export default router