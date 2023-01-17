import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  
  registroForm!: FormGroup;  

  constructor( private fb: FormBuilder, 
               private authService: AuthService,
               private router: Router
              ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre:   ['', Validators.required ],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
    })
  }

  crearUsuario() {

    if( this.registroForm.invalid){ return; }
    
    const { nombre, email, password } = this.registroForm.value;    

    this.authService.crearUsuario(nombre, email, password )
      .then( credenciales => {
        console.log( credenciales );     
         
        //this.router.navigate(['/']); // de esta forma
        this.router.navigateByUrl('/'); // o de esta aunque todas se hace con la ruta relativa
      })
      .catch( (err: any) => Swal.fire({
        icon: 'error',
        title: 'Oops...something went wrong',
        text: err.message
        
      }))
        
     
  }
  

}
