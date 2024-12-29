import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoints;
    this.myApiUrl = 'api/ingredients/'
  }

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

}
