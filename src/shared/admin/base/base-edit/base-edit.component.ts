import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../popup/alert.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { VisitorService } from '../../../firestore/visitor.service';
import { FormGroup } from '@angular/forms';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-base-edit',
  templateUrl: './base-edit.component.html',
  styleUrls: ['./base-edit.component.scss']
})
export class BaseEditComponent<T> implements OnInit {

  form: FormGroup;

  document: T;

  editorConfig: any;

  constructor(protected activatedRoute: ActivatedRoute,
              protected router: Router,
              protected alertService: AlertService,
              protected visitorService: VisitorService,
              protected localizeRouterService: LocalizeRouterService) {
  }

  ngOnInit() {
    this.getDocument();
    this.editorConfig = {
      editable: true,
      spellcheck: false,
      height: '10rem',
      minHeight: '2rem',
      placeholder: 'Enter text content',
      translate: 'no',
      toolbar: []
    };
  }

  createForm() {
  }

  getDocument() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.visitorService.getDocument(key)
          .subscribe((document: T) => {
            this.document = document;
            this.createForm();
          });
      }
    });
  }

  reset() {
    this.form.reset({
      user: '',
      total: 0
    });
  }

  cancel() {
    this.router.navigate([
      this.localizeRouterService.translateRoute('admin'),
    ]).then(() => {
      this.router.navigate([
        this.localizeRouterService.translateRoute('admin'),
        'order'
      ]);
    });
  }

  saveDocument() {
    if (this.form.valid) {
      this.document = this.form.getRawValue();

      if (this.document['published'] === true) {
        this.document['published_at'] = new Date();
      }
      if (this.document['key']) {
        this.visitorService.updateDocument(this.document)
          .then((doc) => {
            this.alertService.show(`document updated ${this.document['key']}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/document')]);
          }, (err) => {
            this.alertService.show(`document error ${err}`);
          });
      } else {
        this.visitorService.createDocument(this.document)
          .then((doc: DocumentReference) => {
            this.alertService.show(`document added ${doc.id}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/document')]);
          }, (err) => {
            this.alertService.show(`document error ${err}`);
          });
      }
    }
  }
}
