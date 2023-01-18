import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

import { Subscription } from 'rxjs';

// router
import { Router } from '@angular/router';

// ngrx
import { Store, Action } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import  * as ui from '../../shared/ui.actions';
// modal alerts
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit,  OnDestroy {
  
  loginForm!: FormGroup;
  cargando: boolean = false;
  uiSubscription!: Subscription;
  isShowButton = false;   
  
  constructor(  private fb: FormBuilder, 
                private authService: AuthService,
                private router: Router,
                private store: Store<AppState>
   ) {}
  
  ngOnInit(): void {
      
      this.loginForm = this.fb.group({      
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
      });

      this.uiSubscription = this.store.select('ui')
                              .subscribe( ui => {
                                this.cargando = ui.isLoading;                              
                                
                              });   
  }
  ngOnDestroy(): void {
    this.isShowButton = false;
    this.uiSubscription.unsubscribe();  
          
  }


  loginUsuario() {   

    if( this.loginForm.invalid){ return; }

    this.store.dispatch( ui.isLoading() );
    
    const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password )
      .then( () => {          
        
        this.store.dispatch( ui.stopLoading() );   
        this.cargando = false;         
        this.router.navigate(['/']);
      })         
      .catch((err: Error) =>                                      
                   Swal.fire({
                              icon: 'error',
                              title: 'Oops... user not found',
                              text: err.message
                                      
                            }).then(()=> {
                               this.isShowButton = false;
                               this.store.dispatch( ui.stopLoading())                     
                            }))           
      

  }    

  toggleButton() {  
    this.isShowButton = !this.isShowButton;  
    
  }  

}
