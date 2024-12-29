import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { AuthService } from 'src/app/services/auth.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styles: [`
    :host ::ng-deep .save-btn .p-button {
      background: var(--cyan-600);
      border-color: var(--cyan-600);
    }

    :host ::ng-deep .save-btn .p-button:hover {
      background: var(--cyan-500) !important;
      border-color: var(--cyan-500) !important;
    }
  `]
})
export class UpdateFormComponent implements OnInit {
  recipeForm: FormGroup
  ingredients: Ingredient[] = []
  selectedIngredients: Ingredient[] = []
  recipeId!: number;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private ingredientService: IngredientService, private recipeService: RecipeService, private authService: AuthService,
    private messageService: MessageService, private router: Router, private route: ActivatedRoute
  ) {
    this.recipeId = this.route.snapshot.params['id'];
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
        this.loadRecipe()
      },
      error: (error) => {
        console.error('Error al cargar ingredientes:', error);
      }
    });
  }

  loadRecipe(): void {
    this.loading = true;
    this.recipeService.getOneRecipe(this.recipeId).subscribe({
      next: (data: any) => {
        const recipe = data.recipe;

        const selectedIngredients = recipe.ingredients

        this.recipeForm.patchValue({
          title: recipe.title,
          steps: recipe.steps,
          imageUrl: recipe.imageUrl,
          ingredients: selectedIngredients
        });

        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar la receta'
        });
      }
    });
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      this.loading = true;
      const userId = this.authService.getUserId();

      const recipe: Recipe = {
        ...this.recipeForm.value,
        id: this.recipeId,
        ingredients: this.recipeForm.value.ingredients.map((ingredient: Ingredient) => ingredient.id),
        userId: userId
      };

      console.log(recipe)

      this.recipeService.updateRecipe(this.recipeId, recipe).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Receta actualizada!'
          });

          setTimeout(() => {
            this.router.navigate(['/my-recipes']);
          }, 1000);
        },
        error: (error) => {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.msg || 'Error al actualizar la receta'
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/recipes']);
  }
}
