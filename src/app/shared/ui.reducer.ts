import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
    stopLoading: boolean; 
}

export const initialState: State = {
    isLoading: false,
    stopLoading: true
}

export const uiReducer = createReducer(initialState,

    on( isLoading, state   => ({ ...state, isLoading: true}) ),
    on( stopLoading, state => ({ ...state, stopLoading: false}) )

);

