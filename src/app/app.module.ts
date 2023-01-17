import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { environment } from '../environments/environment';
// Módulos
import { AppRoutingModule } from './app-routing.module';
// Moodulos reactivos
import { ReactiveFormsModule } from "@angular/forms";

// firestore authentication
import { provideAuth,getAuth } from '@angular/fire/auth';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

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
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from '@firebase/firestore';








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
    provideFirebaseApp(() => initializeApp(environment.firebase)),    
    provideAuth( () => getAuth() ),
    provideFirestore(() => getFirestore())

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


