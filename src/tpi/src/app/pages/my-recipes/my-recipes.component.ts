import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from 'src/app/services/auth.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styles: ''
})
export class MyRecipesComponent implements OnInit {
  recipes: Recipe[] = []
  userId!: number;

  constructor(private authService: AuthService, private recipeService: RecipeService,
    private router: Router, private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId()
    if (this.userId) {
      this.loadUserRecipes()
    }
  }

  loadUserRecipes() {
    this.recipeService.getRecipesByUser(this.userId).subscribe({
      next: (data: any) => {
        this.recipes = data.recipes
      },
      error: (error) => {
        console.error("Error al cargar las recetas: ", error)
      }
    })
  }

  deleteRecipe(id: number) {
    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        this.router.navigate(['/my-recipes'])
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.msg || 'Error al eliminar la receta'
        })
      }
    });
  }

  navigateRecipeForm() {
    this.router.navigate(['/create-recipe'])
  }

  navigateToUpdate(recipeId: number) {
    this.router.navigate(['update-recipe', recipeId])
  }

  navigateToRecipe(recipeId: number) {
    this.router.navigate(['/recipe', recipeId])
  }
}
