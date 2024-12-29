import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    :host ::ng-deep .cyan-button .p-button {
      background: var(--cyan-800);
      border-color: var(--cyan-800);
    }

    :host ::ng-deep .cyan-button .p-button:hover {
      background: var(--cyan-700);
      border-color: var(--cyan-700);
    }
  `]
})
export class HomeComponent implements OnInit {
  selectedIngredients: Ingredient[] = []
  recipes: Recipe[] = []

  totalRecords: number = 0;
  first: number = 0;
  rows: number = 10;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data: any) => {
        this.recipes = data.recipes;
        this.totalRecords = this.recipes.length;
      },
      error: (error) => {
        console.error('Error al buscar recetas:', error);
      }
    });
  }

  onSelectedIngredientsChange(ingredients: Ingredient[]) {
    this.selectedIngredients = [...ingredients];
  }

  searchRecipes() {
    if (!this.selectedIngredients || this.selectedIngredients.length === 0) {
      console.warn('No hay ingredientes seleccionados');
      return;
    }

    const ids = this.selectedIngredients.map(ingredient => ingredient.id);

    this.recipeService.getRecipesByIngredients(ids).subscribe({
      next: (data: any) => {
        this.recipes = data.recipes;
        this.totalRecords = this.recipes.length
        this.first = 0;
      },
      error: (error) => {
        console.error('Error al buscar recetas:', error);
      }
    });

    const recipesSection = document.getElementById('recipes');
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
}