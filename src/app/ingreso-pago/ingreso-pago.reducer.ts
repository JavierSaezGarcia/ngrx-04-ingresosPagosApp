import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './ingreso-pago.actions';
import { IngresoPago } from '../models/ingreso-pago.model';
// SPREAD: convierte un array en una lista de valores.

// REST: convierte una lista de valores en un array.

export interface State {
    items: IngresoPago[]; 
}

export const initialState: State = {
    items: [],
}

export const ingresoPagoReducer = createReducer(initialState,
    
    on( setItems, (state, { items }) => ({ ...state, items: [...items]  })),
    on( unSetItems, state => ({ ...state, items: []  })),


);
