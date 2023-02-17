import { createFeatureSelector } from '@ngrx/store';
import * as contactReducers from './contact.reducer';

export interface AppState {
    contactState: contactReducers.State;
}

//export const reducers = {
//    view: contactReducers.contactListReducer,
//};

//export const AuthStateSelector = createFeatureSelector<AppState>('auth');
export const ViewStateSelector = createFeatureSelector<AppState>('view');