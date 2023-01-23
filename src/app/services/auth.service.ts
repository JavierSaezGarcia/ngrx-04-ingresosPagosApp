import { Injectable } from '@angular/core';
import { Auth, 
         authState,          
         createUserWithEmailAndPassword, 
         signInWithEmailAndPassword
        } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario.model';

// firestore de firebase
import { doc, setDoc, Firestore, getDoc } from '@angular/fire/firestore';
import { getFirestore } from "firebase/firestore"; 

// ngrx
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { AppState } from '../app.reducer';



@Injectable({
  providedIn: 'root',
  
})
export class AuthService {
   
  userSubscription!: Subscription;
  userId!: string | undefined;
  

  
  constructor(
    private auth: Auth,
    private router: Router,
    private firestore:Firestore,
    private store: Store<AppState>
    ) { }

    

  initAuthListener() {

   
    return authState(this.auth).subscribe(async (fuser: any) => {     
      
      
      const docRef = doc(this.firestore,`${ fuser.uid }/usuario`);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data()!;  
      
      
      if(docSnap.exists()){    
        this.userId = docData['uid'];
        // Accedo al metodo estatico y paso como argumento los campos del data
        const user = Usuario.fromFirebase({uid: docData['uid'], email: docData['email'],nombre: docData['nombre']});           
        this.store.dispatch( authActions.setUser({ user }));
      }else{
        this.store.dispatch( authActions.unSetUser());
      }     
      
      
    });
    
  
  
 
  } 

  crearUsuario( nombre: string, email:string, password: string) {
    // console.log({ nombre, email, password });
    return createUserWithEmailAndPassword(this.auth,email,password)
      .then( ({ user }) => {
        const newUser = new Usuario( user.uid, nombre, email );
        const db = getFirestore();
        
        // return doc(this.firestore ,`${ newUser.uid }`, user.uid);
        // quitando la ultima sentencia y añadiendo estas funcionaria

        // en la siguiente sentencia dentro de collection va la bd y la uid del usuario que se loguea
        // y en el cluod firestore a parecera la uid del usuario en la primera columna, la id del documento 
        // en la segunda y en la tercera los campos del usuario
        const userRef = doc( db, `${ user.uid }/usuario`);        
        return setDoc( userRef , {...newUser } );
        
      })   
  }

  loginUsuario( email:string, password:string ){
    console.log({ email, password });    
    return signInWithEmailAndPassword(this.auth,email,password);
  }
 
  logout() {
    
    Swal.fire({
      icon: 'info',
      title: 'Usuario desconectado'
    }).then( () => {
      this.auth.signOut();
      this.store.dispatch( authActions.unSetUser());
      this.router.navigateByUrl('/login');
      
    })
     
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


