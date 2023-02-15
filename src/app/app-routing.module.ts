import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { OrderListComponent } from './order-list/order-list.component';

export const routes: Routes = [
  { path: 'contacts', component: ContactListComponent, title: 'Contacts', data: { title: 'Contacts' } },
  { path: 'orders', component: OrderListComponent, title: 'Orders', data: { title: 'Orders' } },
  { path: 'contact/detail/:id', component: ContactDetailComponent },
];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})
//
//export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);
