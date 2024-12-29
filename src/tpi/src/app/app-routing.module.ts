import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MyRecipesComponent } from './pages/my-recipes/my-recipes.component';
import { authGuard } from './guards/auth.guard';
import { FormRecipeComponent } from './pages/form-recipe/form-recipe.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';

const routes: Routes = [{
  path: 'home',
  component: HomeComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'recipe/:id',
  component: RecipeDetailsComponent
},
{
  path: 'my-recipes',
  component: MyRecipesComponent,
  canActivate: [authGuard]
},
{
  path: 'create-recipe',
  component: FormRecipeComponent,
  canActivate: [authGuard]
},
{
  path: 'update-recipe/:id',
  component: UpdateFormComponent,
  canActivate: [authGuard]
},
{
  path: '', redirectTo: 'home', pathMatch: 'full'
},
{
  path: '**', redirectTo: 'home', pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
