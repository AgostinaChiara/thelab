import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styles: ['']
})
export class RecipeDetailsComponent implements OnInit {
  recipe!: Recipe
  id!: number

  breadcrumbItems: MenuItem[] = [];
  homeItem: MenuItem = { icon: 'pi pi-home', routerLink: '/home' };

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {
    this.breadcrumbItems = [
      { label: 'Recetas', routerLink: '/my-recipes' },
      { label: this.recipe?.title || 'Detalles de la receta' }
    ];
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.recipeService.getOneRecipe(this.id).subscribe({
      next: (data: any) => {
        this.recipe = data.recipe
        this.breadcrumbItems[1].label = this.recipe.title;
      },
      error: (error) => {
        console.log(error)
      }
    })

  }
}
