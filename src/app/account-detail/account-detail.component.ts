import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defer, debounce, filter, first, from, last, map, Observable, switchMap, tap, timer, distinctUntilChanged, of, debounceTime } from 'rxjs';
import { isNonNull } from 'src/main';
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
  id: any = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.$id = this.route.paramMap.pipe(
      map(param => param.get('id')),
      //filter(id => id !== null)
    ) as Observable<string>;

    this.$contact = this.$id.pipe(
      //debounce(() => timer(2000)),
      //tap((id) => console.log(`id: ${id}`)),09270927
      //filter<string>(id => id !== '' && id !== undefined && id !== null),
      debounceTime(500),
      filter(id => isNonNull(id)),
      distinctUntilChanged(),
      switchMap(id => {
        //console.log(`id: ${id}`);
        if (isNonNull(id)) {
          this.id = id;
          console.log(`id: ${id}`);
          return from(api.getContact(id).then(resp => (resp.data as unknown) as ContactDto));
        } else {
          this.id = null;
          return of({} as ContactDto);
        }
      }
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
    //this.$id.subscribe(item => id = item);
    console.log(`item: ${item}`);
    try {
      if (this.id !== null) {
        const res = await api.updateContact(id, { ...item });
      } else {
        const res = await api.createContact({...this.editedContact});
      }
      this.router.navigate(['/accounts']);
    } catch (err) {
      console.error(err);
    }
  }
}
