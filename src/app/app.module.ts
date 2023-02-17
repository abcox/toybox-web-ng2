import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ContactEffects } from './contact/contact-list/store/contact.effects';
import { contactReducers } from './contact/contact-list/store/contact.reducer';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailComponent,
    ContactListComponent,
    OrderListComponent,
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    routing,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    //EffectsModule.forRoot([ContactEffects]), // todo: resolve: Error: NG0203: inject() must be called from an injection context such as a constructor, a factory function, a field initializer, or a function used with `EnvironmentInjector#runInContext`
    StoreModule.forRoot({ contacts: contactReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
