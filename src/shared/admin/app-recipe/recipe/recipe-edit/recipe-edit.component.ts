import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../base/base-edit/base-edit.component';
import { Recipe } from '../../../../../app-recipe/public/recipe/shared/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../popup/alert.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { RecipeService } from '../../../../../app-recipe/public/recipe/shared/recipe.service';
import { DocumentReference } from '@angular/fire/firestore';
import { RecipeFormType } from '../../../shared/recipe/form-recipe';
import { Media } from '../../../../media/media';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { StringService } from '../../../../util/string.service';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-alr-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent extends BaseEditComponent<Recipe> implements OnInit {

  imageStorageConfig: {model: string, alt: string};
  downloadURL: string;
  instructions: FormArray = new FormArray([]);

  constructor(protected activatedRoute: ActivatedRoute,
              protected router: Router,
              protected alertService: AlertService,
              protected recipeService: RecipeService,
              protected localizeRouterService: LocalizeRouterService) {
    super(activatedRoute, router, alertService, recipeService, localizeRouterService);
    this.createForm();
  }

  getDocument() {
    this.activatedRoute.params.subscribe((value: {key: string}) => {
      if (value.key) {
        const key = value.key;
        this.recipeService.getRecipe(key)
          .subscribe((document: Recipe) => {
            this.document = document;
            this.createForm();
            this.createImageStorageConfig();
          });
      }
    });
  }

  createImageStorageConfig() {
    this.imageStorageConfig = {
      model: this.document.key,
      alt: this.document.name,
    };
  }

  /**
   * image change function of emitter
   */
  onImageChange(media: Media) {
    if (this.form) {
      this.form.patchValue({image: media.key});
      if (this.form.get('image')) {
        this.form.get('image').markAsTouched();
      }
      this.form.markAsTouched();
      this.alertService.toast('admin.recipe.image.saved');
    }
  }

  onImageRefChanged(task: UploadTaskSnapshot) {
    task.ref.getDownloadURL().then((downloadURL => {
        this.downloadURL = downloadURL;
      }),
      (err) => {
        this.alertService.show(err);
      });
  }

  createForm() {
    const formType = new RecipeFormType(this.document);
    this.form = formType.getForm();
    this.instructions = this.form.get('instructions') as FormArray;
  }

  reset() {
    this.form.reset({
      name: '',
      slug: '',
      cuisine_type: '',
      cook_time: '01:00',
      prep_time: '01:00',
      total_time: '02:00',
      waiting_time: '00:00',
      creator: 'Anne-Lise',
      yield: 4,
      color: '',
      image: '',
      rating: 0,
      instructions: [],
      preparations: [],
      ingredients: []
    });
  }

  saveDocument() {
    const slug = StringService.slugify(this.form.get('name').value);
    this.form.patchValue({slug: slug});

    if (this.form.valid) {
      this.document = {...this.document, ...this.form.value};

      if (this.document['published'] === true) {
        this.document['published_at'] = new Date();
      }
      if (this.document.key) {
        this.recipeService.updateDocument(this.document)
          .then((doc) => {
            this.alertService.show(`admin.recipe.updated`, {name: this.document.name});
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin'), 'recipe']);
          }, (err) => {
            this.alertService.show(`recipe error ${err}`);
          });
      } else {
        this.recipeService.createDocument(this.document)
          .then((doc: DocumentReference) => {
            this.alertService.show(`recipe added ${doc.id}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin'), 'recipe']);
          }, (err) => {
            this.alertService.show(`recipe error ${err}`);
          });
      }
    }
  }

  get color() {
    return this.form.get('color').value;
  }

  set color(color: string) {
    this.form.patchValue({color: color});
  }

}
