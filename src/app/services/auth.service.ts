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

  initAuthListener() {
    return this.auth.beforeAuthStateChanged( user => {
      console.log( user?.email );
      console.log( user?.uid );
    })
  }

  crearUsuario( email:string, password: string) {
    // console.log({ nombre, email, password });
    return createUserWithEmailAndPassword(this.auth,email,password);    
  }

  loginUsuario( email:string, password:string ){
    console.log({ email, password });    
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  async logout() {
    await this.auth.signOut();
    await Swal.fire({
      icon: 'info',
      title: 'Usuario desconectado'
    }),
      this.router.navigateByUrl('/login');
  }
}
