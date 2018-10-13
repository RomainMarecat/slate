import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../../article/shared/article';

export class ArticleFormType {
  private form: FormGroup;

  constructor(article ?: Article) {
    this.createForm(article);
  }

  createForm(article: Article) {
    this.form = new FormGroup({
      name: new FormControl(article && article.name ? article.name : '', [
        Validators.required,
      ]),
      slug: new FormControl(article && article.slug, [
        Validators.required
      ]),
      description: new FormControl(article && article.description ?
        article.description : '',
        [Validators.required]),
      images: new FormControl([]),
      published: new FormControl(article && article.published ? article.published : true)
    });
  }

  getForm() {
    return this.form;
  }

  resetForm() {
    this.form.reset({
      name: '',
      description: '',
      facebook: '',
      slug: '',
      translations: {
        fr: ''
      },
      images: [],
      category: null,
      published: true,
      published_at: null,
    });
    return this.form;
  }
}
