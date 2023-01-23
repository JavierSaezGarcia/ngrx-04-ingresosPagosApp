import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoPago } from '../models/ingreso-pago.model';
import { IngresoPagoService } from '../services/ingreso-pago.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';


@Component({
  selector: 'app-ingreso-pago',
  templateUrl: './ingreso-pago.component.html',
  styles: [
  ]
})
export class IngresoPagoComponent implements OnInit {
  // propiedades de la clase
  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';
  cargando: boolean = false;

  constructor(private fb: FormBuilder,
              private ingresoPagoService: IngresoPagoService,
              private store: Store<AppState>) { }

  ngOnInit(): void {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    })

  }

  guardar() {

    if(this.ingresoForm.invalid){ return;}
    console.log(this.ingresoForm.value);
    console.log(this.tipo);

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoPago = new IngresoPago(descripcion, monto, this.tipo );
    this.tipo = ingresoPago.tipo;
    this.ingresoPagoService.crearIngresoPago(ingresoPago);
    this.ingresoForm.reset();
  }

}
