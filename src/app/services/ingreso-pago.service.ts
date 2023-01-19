import { Injectable } from '@angular/core';
import { doc, setDoc, collection } from '@angular/fire/firestore';
import { getFirestore } from "firebase/firestore";
import { IngresoPago } from '../models/ingreso-pago.model';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class IngresoPagoService {
  

  constructor(private authService: AuthService) { }

  // TODO 

  crearIngresoPago(ingresoPago: IngresoPago) {
    const uid = this.authService.userId;
    // const tipo = 'ingreso';
    console.log( ingresoPago.tipo);
    // console.log('tengo uid???: ',uid);
    
    const db = getFirestore();

    const docRef = doc(collection(db, `${uid}/${ingresoPago.tipo}/items`));
    return setDoc(docRef, { ...ingresoPago })
      .then(() => {

        Swal.fire('Registro creado', ingresoPago.descripcion, 'success')
      })
      .catch(err => Swal.fire('Error', err.message, 'error'))



    // const userRef = doc( db, `${ uid }/items`); 
    // return setDoc( userRef,{...ingresoPago } )
    //                   .then(() => {

    //                     Swal.fire('Registro creado', ingresoPago.descripcion, 'success')
    //                   })  
    //                   .catch( err => Swal.fire('Error', err.message, 'error'))    

  }
}
