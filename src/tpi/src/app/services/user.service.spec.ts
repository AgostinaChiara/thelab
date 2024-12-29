import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a user', () => {
    const mockUser: User = {
      username: 'testUser',
      password: 'testPassword',
    };

    const mockResponse = {
      token: 'mockJwtToken',
      message: 'Login successful',
    };

    service.loginUser(mockUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/users/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockResponse);
  });

  it('should register a new user', () => {
    const mockUser: User = {
      username: 'newUser',
      password: 'newPassword',
    };

    const mockResponse = {
      message: 'User registered successfully',
    };

    service.registerUser(mockUser).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.endpoints}api/users/`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockUser);
    req.flush(mockResponse);
  });
});
