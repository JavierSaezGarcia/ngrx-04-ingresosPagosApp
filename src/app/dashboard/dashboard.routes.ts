import { Routes } from '@angular/router';
import { DetalleComponent } from '../ingreso-pago/detalle/detalle.component';
import { EstadisticaComponent } from '../ingreso-pago/estadistica/estadistica.component';
import { IngresoPagoComponent } from '../ingreso-pago/ingreso-pago.component';


export const dashboardRoutes: Routes = [
    { path: '', component: EstadisticaComponent },
    { path: 'ingreso-pago', component: IngresoPagoComponent },
    { path: 'detalle', component: DetalleComponent }

];