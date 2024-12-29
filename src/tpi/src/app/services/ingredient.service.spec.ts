import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IngredientService } from './ingredient.service';
import { Ingredient } from '../models/ingredient.model';
import { environment } from 'src/environments/environment';

describe('IngredientService', () => {
  let service: IngredientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IngredientService],
    });
    service = TestBed.inject(IngredientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a list of ingredients', () => {
    const mockIngredients: Ingredient[] = [
      { id: 1, name: 'Flour' },
      { id: 2, name: 'Sugar' },
    ];

    service.getIngredients().subscribe((ingredients) => {
      expect(ingredients).toEqual(mockIngredients);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/ingredients/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockIngredients);
  });

  it('should handle an error response', () => {
    service.getIngredients().subscribe({
      next: () => fail('The request should have failed'),
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/ingredients/`);
    expect(req.request.method).toBe('GET');
    req.flush('Error retrieving ingredients', { status: 500, statusText: 'Server Error' });
  });
});
