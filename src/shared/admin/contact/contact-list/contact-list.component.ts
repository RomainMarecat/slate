import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '../../../popup/dialog/dialog.component';
import { MenuService } from '../../../menu/menu.service';
import { Contact } from '../../../contact/shared/contact';
import { ContactService } from '../../../contact/shared/contact.service';
import { AlertService } from '../../../popup/alert.service';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from 'localize-router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  contacts: Contact[];
  isLoading = false;
  selected: Contact[] = [];
  @ViewChild('checkboxCell', {static: false}) checkboxCell: TemplateRef<any>;
  @ViewChild('actionsCell', {static: false}) actionsCell: TemplateRef<any>;

  constructor(public dialog: MatDialog,
              private router: Router,
              private table: ElementRef,
              private menuService: MenuService,
              private contactService: ContactService,
              private alertService: AlertService,
              private localizeRouterService: LocalizeRouterService) {
  }

  /**
   * Delete a Contact from list
   */
  deleteContacts() {
    this.selected.forEach((contact: Contact) => {
      this.contactService.deleteContact(contact);
    });
  }

  deleteContact(contact: Contact) {
    this.contactService.deleteContact(contact);
  }

  confirmDelete(contact: Contact) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmation de suppression du message',
        content: 'Voulez-vous continuer de supprimer le message ?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteContact(contact);
      }
    });
  }

  /**
   * Init list of Contact
   */
  ngOnInit() {
    this.menuService.nextTitle('Contacts');
    this.setColumns();
    this.contactService.getContacts()
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
      });
  }

  setColumns() {
    this.columns = [{
      width: 50,
      sortable: false,
      canAutoResize: false,
      draggable: false,
      resizeable: false,
      cellTemplate: this.checkboxCell,
    }, {
      prop: 'name',
      name: 'name',
      flexGrow: 1
    }, {
      prop: 'email',
      name: 'email',
      flexGrow: 1
    }, {
      prop: 'message',
      name: 'message',
      flexGrow: 1
    }, {
      prop: 'key',
      name: 'Actions',
      flexGrow: 1,
      cellTemplate: this.actionsCell
    }];
  }

  /**
   * On select add new list in selection array
   */
  onSelect({selected}) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    if (event.type === 'dblclick') {
      this.router.navigate([
        this.localizeRouterService.translateRoute('/admin'),
        'contact',
        'detail',
        event.row.key
      ]);
    }
  }

  onScroll(event: any) {
  }

  onCheckboxChangeFn(event) {
  }
}
