import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedPageComponent } from './routes/connected-page/connected-page.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Services
import { CrudService } from "./services/crud/crud.service";
import { ObservablesService } from "./services/observable/observable.service";

// Router
import { RouterModule } from "@angular/router"
import { AppRouterModule } from "./app.router";
import { HeaderComponent } from './shared/header/header.component';
import { FormLoginComponent } from './shared/form-login/form-login.component';
import { FormSearchComponent } from './shared/form-search/form-search.component';
import { FormRegisterComponent } from './shared/form-register/form-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConnectedPageComponent,
    HeaderComponent,
    FormLoginComponent,
    FormSearchComponent,
    FormRegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( AppRouterModule, { onSameUrlNavigation: 'reload' } ),
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers: [CrudService, ObservablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
