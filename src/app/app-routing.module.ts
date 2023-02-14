import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { OrderListComponent } from './order-list/order-list.component';

export const routes: Routes = [
  { path: 'accounts', component: AccountListComponent, title: 'Accounts', data: { title: 'Accounts' } },
  { path: 'orders', component: OrderListComponent, title: 'Orders', data: { title: 'Orders' } },
  { path: 'account/detail/:id', component: AccountDetailComponent },
];

//@NgModule({
//  imports: [RouterModule.forRoot(routes)],
//  exports: [RouterModule]
//})
//
//export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);
