import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AlertService } from '../../../popup/alert.service';
import { StringService } from '../../../util/string.service';
import { DocumentReference } from '@firebase/firestore-types';
import { AttributeService } from '../../../attribute/attribute.service';
import { Attribute } from '../../../attribute/attribute';
import { AttributeFormType } from '../../shared/attribute/form-attribute';

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
  columns: any;
  selected: string[] = [];
  isLoading: boolean;
  @ViewChild('checkboxHeader') checkboxHeader: TemplateRef < any > ;
  @ViewChild('checkboxCell') checkboxCell: TemplateRef < any > ;

  _typeModel = 'select';
  _termsModel: string[] = [];
  _term = '';
  _orderByModel = 'name';

  /**
   *
   * @param activatedRoute
   * @param router
   * @param alertService
   * @param attributeService
   */
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private attributeService: AttributeService) {}

  ngOnInit() {
    this.createForm();
    this.getAttribute();
    this.observeUpdate();
  }

  createForm() {
    const formType = new AttributeFormType(this.attribute);
    this.form = formType.getForm();
  }


  getAttribute() {
    this.activatedRoute.params.subscribe((value: { key: string }) => {
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
      .debounceTime(800)
      .subscribe((value) => {
        if (value.name) {
          const slug = StringService.slugify(value.name);
          this.form.patchValue({ name: value.name, slug: slug });
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
      type: '',
      order_by: '',
      terms: [],
    });
  }

  saveAttribute() {
    if (this.form.value.term !== '') {
      this.addTerm(this.form.value.term);
      return;
    }

    this.form.patchValue({
      type: this._typeModel,
      order_by: this._orderByModel,
      terms: this._termsModel
    });
    if (this.form.valid) {
      this.attribute = { ...this.attribute, ...this.form.value };
      if (this.attribute.key) {
        this.attributeService.updateAttribute(this.attribute)
          .then((doc) => {
            this.alertService.toast(`attribute updated ${this.attribute.translations.fr}`);
            this.reset();
          }, (err) => {
            this.alertService.toast(`attribute error ${err}`);
          });
        this.router.navigate(['/admin/attribute']);
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
  }

  /**
   *
   * @param event
   */
  addTerm(event: any) {
    this._termsModel.push(this._term);
    this.form.patchValue({ terms: this._termsModel });
    this._term = '';
  }

  get name() {
    return this.form.get('name');
  }

  set name(name) {
    this.form.patchValue({ name: name });
  }

  get slug() {
    return this.form.get('slug');
  }

  set slug(slug) {
    this.form.patchValue({ slug: slug });
  }

  get terms() {
    return this.form.get('terms');
  }

  set terms(terms) {
    this.form.patchValue({ terms: terms });
  }

  get type() {
    return this.form.get('type');
  }

  set type(type) {
    this.form.patchValue({ type: type });
  }

  get fr() {
    return this.form.get('translations').get('fr');
  }

  set fr(fr) {
    this.form.get('translations').patchValue({ fr: fr });
  }

  get typeModel() {
    return this._typeModel;
  }

  set typeModel(type) {
    this._typeModel = type;
  }

  get order_by() {
    return this.form.get('order_by');
  }

  set order_by(orderBy) {
    this.form.patchValue({ order_by: orderBy });
  }

  get orderByModel() {
    return this._orderByModel;
  }

  set orderByModel(orderByModel) {
    this._orderByModel = orderByModel;
  }

  set termsModel(model) {
    this._termsModel = model;
  }

  get termsModel() {
    return this._termsModel;
  }

  set term(term) {
    this._term = term;
  }

  get term() {
    return this._term;
  }
}
