import { Router } from 'express'
import { createRecipe, deleteRecipe, getRecipe, getRecipes, getRecipesByIngredients, getRecipesByUser, updateRecipe } from '../controllers/recipe'

const router = Router()

router.get('/', getRecipes)
router.get('/:id', getRecipe)
router.get('/user/:userId', getRecipesByUser)

router.post('/', createRecipe)
router.post('/search', getRecipesByIngredients)

router.patch('/:id', updateRecipe)

router.delete('/:id', deleteRecipe)

export default router