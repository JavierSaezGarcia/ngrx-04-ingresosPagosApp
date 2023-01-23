import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoPago } from '../models/ingreso-pago.model';
import { IngresoPagoService } from '../services/ingreso-pago.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as ui from '../shared/ui.actions';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ingreso-pago',
  templateUrl: './ingreso-pago.component.html',
  styles: [
  ]
})
export class IngresoPagoComponent implements OnInit, OnDestroy {
  // propiedades de la clase
  loadingSubs!: Subscription;
  ingresoForm!: FormGroup;
  tipo: string      = 'ingreso';
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private ingresoPagoService: IngresoPagoService,
              private store: Store<AppState>) { }
  

  ngOnInit(): void {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })
    this.loadingSubs = this.store.select('ui')
                      .subscribe( ui => {  this.cargando = ui.isLoading; });   

  }

  ngOnDestroy(): void {

    this.loadingSubs.unsubscribe();  
  }

  guardar() {
       

    if(this.ingresoForm.invalid){ return;}

    this.store.dispatch( ui.isLoading() );

    // console.log(this.ingresoForm.value);
    // console.log(this.tipo);

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoPago = new IngresoPago(descripcion, monto, this.tipo );
    this.tipo = ingresoPago.tipo;
    this.ingresoPagoService.crearIngresoPago( ingresoPago )
                                        .then( () => {
                                          this.ingresoForm.reset();
                                          this.store.dispatch( ui.stopLoading() );
                                          Swal.fire('Registro creado', 'Descripción: ' + descripcion + ' - ' + 'Cantidad: ' + monto , 'success');
                                          
                                        })
                                        .catch( err => {
                                          this.store.dispatch( ui.stopLoading() );
                                          Swal.fire("Error", err.message, 'error')
                                        });
    
  }

}
