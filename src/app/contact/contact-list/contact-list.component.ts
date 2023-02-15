import { DataSource } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactApi, ContactDto } from 'toybox-backend';
import { config as apiConfig } from "../../../api/config";

const api = new ContactApi(apiConfig);

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  title='Accounts'
  displayedColumns: string[] = ['name','email','phone','edit','delete'];
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
    this.router.navigate(['/contact-details', 0]);
  }

  async delete(id: any) {
    console.log(`delete ${id}`);
    try {
      const res = await api.deleteContact(id);
      this.fetchItems();
    } catch (err) {
      console.error(err);
    }
  }
}
