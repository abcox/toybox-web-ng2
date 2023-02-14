import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactApi, ContactDto } from 'toybox-backend';
import { config as apiConfig } from "../../api/config";

const api = new ContactApi(apiConfig);

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent {
  title='Accounts'
  displayedColumns: string[] = ['name','email','phone','edit'];
  dataSource!: DataSource<ContactDto>;

  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
    this.fetchItems();
  }
  
  async fetchItems() {
    try {
      const res = await api.getContacts();
      this.dataSource = (res.data as unknown) as DataSource<ContactDto>;
    } catch (err) {
      console.error(err);
    }
  }

  edit(id: any) {
    console.log(`id: ${id}`);
    this.router.navigate(['/account-details', 1]);
  }
}