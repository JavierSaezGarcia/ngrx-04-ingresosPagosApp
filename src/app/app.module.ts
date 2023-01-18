// Imports angular default
import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
// Módulos routing
import { AppRoutingModule } from './app-routing.module';
// Moodulos reactivos
import { ReactiveFormsModule } from "@angular/forms";

// firestore authentication
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from '@firebase/firestore';

//ngrx imports
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';

// Imports of components application
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoPagoComponent } from './ingreso-pago/ingreso-pago.component';
import { EstadisticaComponent } from './ingreso-pago/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-pago/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    IngresoPagoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    // firebase      
    provideFirebaseApp(() => initializeApp(environment.firebase)),   
    provideAuth( () => getAuth() ),
    provideFirestore(() => getFirestore()),
    // ngrx
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode     
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


