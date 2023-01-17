import { Injectable } from '@angular/core';
import { Auth, 
         authState, 
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword
        } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
  
})
export class AuthService {

  constructor(
    private auth: Auth,
    private router: Router,
    private firestore: Firestore ) { 
                
              }

  initAuthListener() {
    return this.auth.beforeAuthStateChanged( user => {
      console.log( user );
      console.log( user?.email );
      console.log( user?.uid );
    })
  }

  crearUsuario( nombre: string, email:string, password: string) {
    // console.log({ nombre, email, password });
    return createUserWithEmailAndPassword(this.auth,email,password)
      .then( ({ user }) => {
        const newUser = new Usuario( user.uid, nombre, user.email );
        const userRef = collection( this.firestore, `usuarios`);
        return addDoc( userRef, {...newUser } );
      })   
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

  isAuth(): Observable<boolean> {
    // authState es un observable por lo tanto podemos pasarlo por el metodo pipe
    // para poder usar el map para mutar( cambiar ) la respuesta = lo que yo quiera devolver
    return authState(this.auth).pipe(
      map( firebaseUser => firebaseUser !== null ) 
      // si se cumple firebaseUser === null devolvera un falso o si se cumple firebaseUser !== null devolvera un true
      //es decir existe o no el usuario en la bd de firebase
    );
  }

}
