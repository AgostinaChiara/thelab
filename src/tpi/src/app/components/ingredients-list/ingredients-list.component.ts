import { Component, ChangeDetectorRef, OnInit, Output, EventEmitter } from '@angular/core';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrl: './ingredients-list.component.css'
})
export class IngredientsListComponent implements OnInit {
  sourceIngredients: Ingredient[] = [];
  targetIngredients: Ingredient[] = [];

  @Output() selectedIngredients = new EventEmitter<Ingredient[]>();

  constructor(
    private ingredientService: IngredientService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe({
      next: (ingredients: Ingredient[]) => {
        this.sourceIngredients = ingredients;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar ingredientes:', error);
      }
    });
  }

  onTargetChange(event: any) {
    this.selectedIngredients.emit(this.targetIngredients);
  }
}
