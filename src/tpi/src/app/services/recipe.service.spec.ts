import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecipeService } from './recipe.service';
import { Recipe } from '../models/recipe.model';
import { environment } from 'src/environments/environment';

describe('RecipeService', () => {
  let service: RecipeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecipeService],
    });
    service = TestBed.inject(RecipeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a single recipe by ID', () => {
    const mockRecipe: Recipe = {
      id: 1,
      title: 'Pizza',
      ingredients: [{ id: 1, name: 'Cheese' }],
      imageUrl: 'pizza.jpg',
      steps: 'Bake for 20 minutes.',
      user: { username: 'testUser', password: 'testPassword' },
    };

    service.getOneRecipe(1).subscribe((recipe) => {
      expect(recipe).toEqual(mockRecipe);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/recipes/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRecipe);
  });

  it('should retrieve all recipes', () => {
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        title: 'Pizza',
        ingredients: [{ id: 1, name: 'Cheese' }],
        imageUrl: 'pizza.jpg',
        steps: 'Bake for 20 minutes.',
        user: { username: 'testUser', password: 'testPassword' },
      },
      {
        id: 2,
        title: 'Pasta',
        ingredients: [{ id: 2, name: 'Tomato Sauce' }],
        imageUrl: 'pasta.jpg',
        steps: 'Boil for 10 minutes.',
        user: { username: 'anotherUser', password: 'anotherPassword' },
      },
    ];

    service.getAllRecipes().subscribe((recipes) => {
      expect(recipes).toEqual(mockRecipes);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/recipes/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRecipes);
  });

  it('should retrieve recipes by ingredients', () => {
    const mockIngredients = [1, 2];
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        title: 'Pizza',
        ingredients: [{ id: 1, name: 'Cheese' }],
        imageUrl: 'pizza.jpg',
        steps: 'Bake for 20 minutes.',
        user: { username: 'testUser', password: 'testPassword' },
      },
    ];

    service.getRecipesByIngredients(mockIngredients).subscribe((recipes) => {
      expect(recipes).toEqual(mockRecipes);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/recipes/search`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ ingredients: mockIngredients });
    req.flush(mockRecipes);
  });

  it('should retrieve recipes by user ID', () => {
    const userId = 1;
    const mockRecipes: Recipe[] = [
      {
        id: 1,
        title: 'Pizza',
        ingredients: [{ id: 1, name: 'Cheese' }],
        imageUrl: 'pizza.jpg',
        steps: 'Bake for 20 minutes.',
        user: { username: 'testUser', password: 'testPassword' },
      },
    ];

    service.getRecipesByUser(userId).subscribe((recipes) => {
      expect(recipes).toEqual(mockRecipes);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/recipes/user/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRecipes);
  });

  it('should delete a recipe by ID', () => {
    const recipeId = 1;
    const mockRecipe: Recipe = {
      id: recipeId,
      title: 'Pizza',
      ingredients: [{ id: 1, name: 'Cheese' }],
      imageUrl: 'pizza.jpg',
      steps: 'Bake for 20 minutes.',
      user: { username: 'testUser', password: 'testPassword' },
    };

    service.deleteRecipe(recipeId).subscribe((recipe) => {
      expect(recipe).toEqual(mockRecipe);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/recipes/${recipeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockRecipe);
  });

  it('should update a recipe by ID', () => {
    const recipeId = 1;
    const updatedData = { title: 'Updated Pizza' };
    const updatedRecipe: Recipe = {
      id: recipeId,
      title: 'Updated Pizza',
      ingredients: [{ id: 1, name: 'Cheese' }],
      imageUrl: 'pizza.jpg',
      steps: 'Bake for 20 minutes.',
      user: { username: 'testUser', password: 'testPassword' },
    };

    service.updateRecipe(recipeId, updatedData).subscribe((recipe) => {
      expect(recipe).toEqual(updatedRecipe);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/recipes/${recipeId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedData);
    req.flush(updatedRecipe);
  });

  it('should create a new recipe', () => {
    const newRecipe: Recipe = {
      id: 1,
      title: 'Pizza',
      ingredients: [{ id: 1, name: 'Cheese' }],
      imageUrl: 'pizza.jpg',
      steps: 'Bake for 20 minutes.',
      user: { username: 'testUser', password: 'testPassword' },
    };

    service.createRecipe(newRecipe).subscribe((recipe) => {
      expect(recipe).toEqual(newRecipe);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/recipes/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newRecipe);
    req.flush(newRecipe);
  });
});
