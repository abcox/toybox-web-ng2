import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defer, filter, from, map, Observable, switchMap } from 'rxjs';
import { ContactApi, ContactDto } from 'toybox-backend';
import { config as apiConfig } from "../../api/config";

const api = new ContactApi(apiConfig);

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  $id!: Observable<string>;
  title='Account detail for'
  $contact!: Observable<ContactDto>;
  editedContact: ContactDto = {
    name: '',
    email: '',
    phone: ''
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.$id = this.route.paramMap.pipe(
      map(param => param.get('id')),
      //filter(id => id !== null)
    ) as Observable<string>;

    this.$contact = this.$id.pipe(
      switchMap(id =>
        from(api.getContact(id).then(resp => (resp.data as unknown) as ContactDto))
    ));

    this.$contact.subscribe(contact => this.editedContact = contact);
  }
  ngOnDestroy(): void {
    // nothing
  }
  ngOnInit() {
    // nothing
  }
  async save() {
    const item = this.editedContact;
    let id: string = '';
    this.$id.subscribe(item => id = item);
    console.log(`item: ${item}`);
    try {
      const resp = await api.updateContact(id, { ...item });
      this.router.navigate(['/accounts']);
    } catch (err) {
      console.error(err);
    }
  }
}
