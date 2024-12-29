import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-form-recipe',
  templateUrl: './form-recipe.component.html',
  styles: ''
})
export class FormRecipeComponent implements OnInit {
  recipeForm: FormGroup
  ingredients: Ingredient[] = []
  selectedIngredients: Ingredient[] = []

  constructor(private fb: FormBuilder, private ingredientService: IngredientService, private recipeService: RecipeService, private authService: AuthService,
    private messageService: MessageService, private router: Router) {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      steps: ['', Validators.required],
      imageUrl: ['', Validators.required],
      ingredients: [[], Validators.required]
    })
  }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe({
      next: (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      },
      error: (error) => {
        console.error('Error al cargar ingredientes:', error);
      }
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      const userId = this.authService.getUserId()

      const recipe: Recipe = {
        ...this.recipeForm.value,
        id: 0,
        ingredients: this.recipeForm.value.ingredients.map((ingredient: Ingredient) => ingredient.id),
        userId: userId
      }

      this.recipeService.createRecipe(recipe).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Receta creada!'
          });

          setTimeout(() => {
            this.router.navigate(['/my-recipes'])
          }, 1000)
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.msg || 'Error al crear receta'
          })
        }
      })
    }
  }
}
