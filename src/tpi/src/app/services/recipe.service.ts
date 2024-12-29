import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private myAppUrl: string
  private myApiUrl: string

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoints
    this.myApiUrl = 'api/recipes/'
  }

  getOneRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  getRecipesByIngredients(ingredients: number[]): Observable<Recipe[]> {
    return this.http.post<Recipe[]>(`${this.myAppUrl}${this.myApiUrl}/search`, { ingredients })
  }

  getRecipesByUser(userId: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.myAppUrl}${this.myApiUrl}/user/${userId}`)
  }

  deleteRecipe(recipeId: number): Observable<Recipe> {
    return this.http.delete<Recipe>(`${this.myAppUrl}${this.myApiUrl}/${recipeId}`)
  }

  updateRecipe(id: number, data: any): Observable<Recipe> {
    return this.http.patch<Recipe>(`${this.myAppUrl}${this.myApiUrl}${id}`, data);
  }

  createRecipe(newRecipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(`${this.myAppUrl}${this.myApiUrl}`, newRecipe)
  }
}
