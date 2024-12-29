import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG imports
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { PickListModule } from 'primeng/picklist';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollTopModule } from 'primeng/scrolltop';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { DividerModule } from 'primeng/divider';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BreadcrumbModule } from 'primeng/breadcrumb';

// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { IngredientsListComponent } from './components/ingredients-list/ingredients-list.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { MyRecipesComponent } from './pages/my-recipes/my-recipes.component';
import { FormRecipeComponent } from './pages/form-recipe/form-recipe.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { UpdateFormComponent } from './pages/update-form/update-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    IngredientsListComponent,
    LoginComponent,
    RegisterComponent,
    RecipeComponent,
    MyRecipesComponent,
    FormRecipeComponent,
    RecipeDetailsComponent,
    UpdateFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    AvatarModule,
    MultiSelectModule,
    CardModule,
    PickListModule,
    CheckboxModule,
    ToastModule,
    DataViewModule,
    PaginatorModule,
    ScrollTopModule,
    MenuModule,
    SidebarModule,
    DividerModule,
    OverlayPanelModule,
    BreadcrumbModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
