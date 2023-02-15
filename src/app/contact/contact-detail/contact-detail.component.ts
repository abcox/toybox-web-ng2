import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defer, debounce, filter, first, from, last, map, Observable, switchMap, tap, timer, distinctUntilChanged, of, debounceTime } from 'rxjs';
import { isNonNull } from 'src/main';
import { ContactApi, ContactDto } from 'toybox-backend';
import { config as apiConfig } from "../../../api/config";

const api = new ContactApi(apiConfig);

@Component({
  selector: 'contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit, OnDestroy {
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
    ) as Observable<any>;

    this.$contact = this.$id.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(id => {
        if (!!id && id !== 'null') {
          this.id = id;
          console.log(`id: ${id}`);
          return from(api.getContact(id).then(resp => (resp.data as unknown) as ContactDto));
        } else {
          this.id = null;
          return of({
            name: '',
            email: '',
            phone: ''
          } as ContactDto);
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
    let id: string = this.id;
    //this.$id.subscribe(item => id = item);
    console.log(`item: ${item}`);
    try {
      if (this.id !== null) {
        console.log(`updating ${id} with ${item}`);
        const res = await api.updateContact(id, { ...item });
      } else {
        const res = await api.createContact({...this.editedContact});
      }
      this.router.navigate(['/contacts']);
    } catch (err) {
      console.error(err);
    }
  }
}
