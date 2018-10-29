import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../base/base-edit/base-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../popup/alert.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { Order } from '../../../order/shared/order';
import { OrderService } from '../../../order/shared/order.service';
import { OrderFormType } from '../../shared/order/form-order';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.scss']
})
export class OrderEditComponent extends BaseEditComponent<Order> implements OnInit {

  constructor(protected activatedRoute: ActivatedRoute,
              protected router: Router,
              protected alertService: AlertService,
              protected orderService: OrderService,
              protected localizeRouterService: LocalizeRouterService) {
    super(activatedRoute, router, alertService, orderService, localizeRouterService);
    this.createForm();
  }

  getDocument() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.orderService.getOrder(key)
          .subscribe((document: Order) => {
            this.document = document;
            this.createForm();
          });
      }
    });
  }

  createForm() {
    const formType = new OrderFormType(this.document);
    this.form = formType.getForm();
  }

  saveDocument() {
    if (this.form.valid) {

      this.document = {...this.document, ...this.form.value};

      if (this.document['published'] === true) {
        this.document['published_at'] = new Date();
      }
      if (this.document.key) {
        this.orderService.updateDocument(this.document)
          .then((doc) => {
            this.alertService.show(`document updated ${this.document.key}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/order')]);
          }, (err) => {
            this.alertService.show(`order error ${err}`);
          });
      } else {
        this.orderService.createDocument(this.document)
          .then((doc: DocumentReference) => {
            this.alertService.show(`order added ${doc.id}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/order')]);
          }, (err) => {
            this.alertService.show(`order error ${err}`);
          });
      }
    }
  }
}
