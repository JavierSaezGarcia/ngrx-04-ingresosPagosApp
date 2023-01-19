import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoPago } from '../models/ingreso-pago.model';
import { IngresoPagoService } from '../services/ingreso-pago.service';


@Component({
  selector: 'app-ingreso-pago',
  templateUrl: './ingreso-pago.component.html',
  styles: [
  ]
})
export class IngresoPagoComponent implements OnInit {

  ingresoForm!: FormGroup;
  tipo: string = 'ingreso';

  constructor(private fb: FormBuilder,
              private ingresoPagoService: IngresoPagoService) { }

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
