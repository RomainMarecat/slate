import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { StringService } from '../../../util/string.service';
import { DocumentReference } from '@firebase/firestore-types';
import { AttributeService } from '../../../attribute/attribute.service';
import { Attribute } from '../../../attribute/attribute';
import { AttributeFormType } from '../../shared/attribute/form-attribute';
import { TableColumn } from '@swimlane/ngx-datatable';
import { LocalizeRouterService } from 'localize-router';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-attribute-edit',
  templateUrl: './attribute-edit.component.html',
  styleUrls: ['./attribute-edit.component.scss']
})
export class AttributeEditComponent implements OnInit {

  form: FormGroup;
  attribute: Attribute;
  editorConfig: any;

  readonly headerHeight = 50;
  readonly rowHeight = 50;
  columns: TableColumn[];
  selected: string[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader', {static: false}) checkboxHeader: TemplateRef<any>;
  @ViewChild('checkboxCell', {static: false}) checkboxCell: TemplateRef<any>;

  _termsModel: string[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertService: AlertService,
              private attributeService: AttributeService,
              private localizeRouterService: LocalizeRouterService) {
    this.createForm();
  }

  ngOnInit() {
    this.getAttribute();
    this.observeUpdate();
  }

  createForm() {
    const formType = new AttributeFormType(this.attribute);
    this.form = formType.getForm();
  }


  getAttribute() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.attributeService.getAttribute(key)
          .subscribe((attribute: Attribute) => {
            this.attribute = attribute;
            this.createForm();
            setTimeout(() => {
              this.observeUpdate();
            }, 2000);
          });
      }
    });
  }

  observeUpdate() {
    this.form.valueChanges
      .pipe(
        debounceTime(800)
      )
      .subscribe((value) => {
        if (value.name) {
          const slug = StringService.slugify(value.name);
          this.form.patchValue({name: value.name, slug});
        }
      });
  }

  reset() {
    this._termsModel = [];
    this.selected = [];
    this.form.reset({
      name: '',
      slug: '',
      translations: {
        fr: ''
      },
      type: 'select',
      order_by: 'name',
      terms: [],
    });
  }

  saveAttribute() {
    if (this.form.value.term !== '') {
      this.addTerm(this.form.value.term);
      return;
    }

    this.form.patchValue({
      terms: this._termsModel
    });
    if (this.form.valid) {
      this.attribute = {...this.attribute, ...this.form.value};
      this.updateAttribute();
    }
  }

  updateAttribute() {
    if (this.attribute.key) {
      this.attributeService.updateAttribute(this.attribute)
        .then((doc) => {
          this.alertService.toast(`attribute updated ${this.attribute.translations.fr}`);
          this.reset();
        }, (err) => {
          this.alertService.toast(`attribute error ${err}`);
        });
      this.router.navigate([
        this.localizeRouterService.translateRoute('/admin'),
        'attribute'
      ]);
    } else {
      this.attributeService.createAttribute(this.attribute)
        .then((doc: DocumentReference) => {
          this.alertService.toast(`attribute added ${doc.id}`);
          this.reset();
        }, (err) => {
          this.alertService.toast(`attribute error ${err}`);
        });
    }
  }

  addTerm(event: any) {
    this._termsModel.push(this.form.value.term);
    this.form.patchValue({terms: this._termsModel, term: ''});
  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({name});
  }

  get slug() {
    return this.form.get('slug');
  }

  set slug(slug) {
    this.form.patchValue({slug});
  }

  get terms() {
    return this.form.get('terms');
  }

  set terms(terms) {
    this.form.patchValue({terms});
  }

  get fr() {
    return this.form.get('translations').get('fr');
  }

  set fr(fr) {
    this.form.get('translations').patchValue({fr});
  }

  get order_by() {
    return this.form.get('order_by');
  }

  set order_by(orderBy) {
    this.form.patchValue({order_by: orderBy});
  }

  set termsModel(model) {
    this._termsModel = model;
  }

  get termsModel() {
    return this._termsModel;
  }
}
