import { Action, createAction, createActionGroup, props } from '@ngrx/store';
import { ContactDto } from 'toybox-backend';

export const ContactActions = createActionGroup({
  source: 'Contacts',
  events: {
    'Get Contact': props<{ id: string }>(),
    'Search Contacts': props<{ filter: { contact: ContactDto, paging: { start: number, limit: number } } }>(),
    'Contacts Retrieved': props<{ payload: ContactDto[] }>(),
    'Failed Response': props<{ request: any, error: any }>(),
  }
})