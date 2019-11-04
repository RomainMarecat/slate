import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Selection } from '../../../../selection/selection';

export class SelectionFormType {
  private form: FormGroup;

  constructor(selection ?: Selection) {
    this.createForm(selection);
  }

  createForm(selection: Selection) {
    this.form = new FormGroup({
      name: new FormControl(selection && selection.name ? selection.name : '', [
        Validators.required,
      ]),
      translations: new FormGroup({
        fr: new FormControl(selection && selection.translations && selection.translations.fr ?
          selection.translations.fr : '', [
            Validators.required
          ])
      }),
      slug: new FormControl(selection && selection.slug, []),
      alias: new FormControl(selection && selection.alias, []),
      description: new FormControl(
        selection && selection.description ? selection.description : '', []
      ),
      keywords: new FormControl(
        selection && selection.keywords ? selection.keywords : '', []
      ),
      parent: new FormControl(
        selection && selection.parent ? selection.parent : null, []
      ),
      level: new FormControl(
        selection && selection.level ? selection.level : 0, []),
      products: new FormControl(
        selection && selection.products ? selection.products : [], []
      ),
      images: new FormControl(
        selection && selection.images ? selection.images : [], []
      ),
      root: new FormControl(selection && selection.root ? selection.root : false, []),
      published: new FormControl(selection && selection.published ? selection.published : true, []),
      published_at: new FormControl(selection && selection.published_at ?
        selection.published_at : '', [])
    });
  }

  getForm() {
    return this.form;
  }

  resetForm() {
    this.form.reset({
      name: '',
      description: '',
      keywords: '',
      translations: {
        fr: ''
      },
      slug: '',
      alias: '',
      level: 1,
      products: [],
      root: false,
      published: true,
      published_at: null,
      images: [],
    });
    return this.form;
  }
}
