import { createAction, props } from '@ngrx/store';
import { IngresoPago } from '../models/ingreso-pago.model';

export const unSetItems   = createAction('[IngresoPago] unSetItems');

export const setItems = createAction(
    '[IngresoPago] setItems',
    props<{ items: IngresoPago[] }>()
    );