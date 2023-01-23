import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ingresoPago from './ingreso-pago/ingreso-pago.reducer';

export interface AppState {
   ui: ui.State,
   user: auth.State,
   ingresosPagos: ingresoPago.State
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   user: auth.authReducer,
   ingresosPagos: ingresoPago.ingresoPagoReducer,
}
