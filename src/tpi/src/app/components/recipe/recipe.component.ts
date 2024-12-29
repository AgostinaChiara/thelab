import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: [`
    :host ::ng-deep .cyan-button .p-button {
      background: var(--cyan-600);
      border-color: var(--cyan-600);
    }

    :host ::ng-deep .cyan-button .p-button:hover {
      background: var(--cyan-500);
      border-color: var(--cyan-500);
    }
  `]
})
export class RecipeComponent {
  @Input() recipe!: Recipe

  constructor(private router: Router) { }

  navigateToRecipe(recipeId: number) {
    this.router.navigate(['/recipe', recipeId])
  }
}
