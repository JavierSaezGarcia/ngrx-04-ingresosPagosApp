import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup;
  
  constructor(  private fb: FormBuilder, 
                private authService: AuthService,
                private router: Router
   ) {}

  ngOnInit(): void {
      this.loginForm = this.fb.group({      
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required ],
    })
    
  }

  loginUsuario() {

    if( this.loginForm.invalid){ return; }

   const { email, password } = this.loginForm.value;

    this.authService.loginUsuario( email, password )
      .then( (credenciales: any) => {
        console.log( credenciales );       
        
        this.router.navigate(['/']); // de esta forma
        // this.router.navigateByUrl('/'); // o de esta aunque todas se hace con la ruta relativa
      })
      .catch( (err: any) => Swal.fire({
                                      icon: 'error',
                                      title: 'Oops... user not found',
                                      text: err.message
                                      
                                    }))

  }

}
