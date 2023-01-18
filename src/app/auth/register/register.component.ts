import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// router
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { Subscription } from 'rxjs';
// ngrx
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
// modal alerts
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  registroForm!: FormGroup;  
  cargando: boolean = false;
  uiSubscription!: Subscription;
  isShowButton = false;   

  constructor( private fb: FormBuilder, 
               private authService: AuthService,
               private router: Router,
               private store: Store<AppState>
              ) {}
  

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
    });

    this.uiSubscription = this.store.select('ui')
                              .subscribe( ui => {
                                this.cargando = ui.isLoading; 
                                console.log('cargando subs desde register');
                              });   

  }

  ngOnDestroy(): void {
    this.isShowButton = false;
    this.uiSubscription.unsubscribe();
  }

  crearUsuario() {

    if( this.registroForm.invalid){ return; }

    this.store.dispatch( isLoading() );
    
    const { nombre, email, password } = this.registroForm.value;    

    this.authService.crearUsuario(nombre, email, password )
      .then( credenciales => {
        console.log( credenciales );     
        this.store.dispatch( stopLoading() );
        //this.router.navigate(['/']); // de esta forma
        this.router.navigateByUrl('/'); // o de esta aunque todas se hace con la ruta relativa
      })
      .catch( (err: any) => Swal.fire({
        icon: 'error',
        title: 'Oops...something went wrong',
        text: err.message
        
      }).then(()=> {
        this.isShowButton = false;                        
     }))
        
     
  }
  toggleButton() {  
    this.isShowButton = !this.isShowButton;  
  }  
  

}
