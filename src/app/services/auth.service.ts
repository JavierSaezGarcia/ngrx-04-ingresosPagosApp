import { Injectable } from '@angular/core';
import { Auth, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth,
              private router: Router) { }

  crearUsuario( email:string, password: string) {

    // console.log({ nombre, email, password });

    return createUserWithEmailAndPassword(this.auth,email,password);
    
  }

  loginUsuario( email:string, password:string ){
    console.log({ email, password });    
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  logout() {
    return this.auth.signOut()
      .then( () => {
        Swal.fire({
          icon: 'info',
          title: 'Usuario desconectado' 
          
        }),
        this.router.navigateByUrl('/login');

      })
  }
}
