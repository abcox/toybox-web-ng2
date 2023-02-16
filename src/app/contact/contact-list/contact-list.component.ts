import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactApi, ContactDto } from 'toybox-backend';
import { config as apiConfig } from "../../../api/config";

const api = new ContactApi(apiConfig);

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements AfterViewInit {
  title='Contacts'
  displayedColumns: string[] = ['name','email','phone','edit','delete'];
  dataSource = new MatTableDataSource<ContactDto>;
  search: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(page => {
      console.log(`page: `, page);
      this.submitSearch();
    });
    this.submitSearch();
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute
    ) {
      // nothing
  }

  clearSearch() {
    this.search='';
  }

  async submitSearch() {
    let reqParams = {
      sortDesc: [true],
      sortBy: [''],
      search: this.search,
      limit: this.paginator.pageSize,
      page: this.paginator.pageIndex + 1,
      options: {}
    };
    try {
      console.log(`searching... ${reqParams.search}`);
      const res = await api.searchContacts(
        reqParams.sortDesc,
        reqParams.sortBy,
        reqParams.search,
        reqParams.limit,
        reqParams.page,
        reqParams.options
      ); // todo: searchRequest model needed
      console.log(`res.data: ${JSON.stringify(res.data)}`);
      const data: any = res.data;
      this.dataSource = data.docs as MatTableDataSource<ContactDto>;
      this.paginator.length = +data.meta.total;
      this.dataSource.paginator = this.paginator;
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
      this.submitSearch();
    } catch (err) {
      console.error(err);
    }
  }
}
