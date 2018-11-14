import { Component, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../base/base-edit/base-edit.component';
import { Recipe } from '../../../../../app-recipe/public/recipe/shared/recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../../popup/alert.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { RecipeService } from '../../../../../app-recipe/public/recipe/shared/recipe.service';
import { DocumentReference } from '@angular/fire/firestore';
import { RecipeFormType } from '../../../shared/recipe/form-recipe';

@Component({
  selector: 'app-alr-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent extends BaseEditComponent<Recipe> implements OnInit {

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
          });
      }
    });
  }

  createForm() {
    const formType = new RecipeFormType(this.document);
    this.form = formType.getForm();
  }

  saveDocument() {
    if (this.form.valid) {

      this.document = {...this.document, ...this.form.value};

      if (this.document['published'] === true) {
        this.document['published_at'] = new Date();
      }
      if (this.document.key) {
        this.recipeService.updateDocument(this.document)
          .then((doc) => {
            this.alertService.show(`document updated ${this.document.key}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/recipe')]);
          }, (err) => {
            this.alertService.show(`recipe error ${err}`);
          });
      } else {
        this.recipeService.createDocument(this.document)
          .then((doc: DocumentReference) => {
            this.alertService.show(`recipe added ${doc.id}`);
            this.reset();
            this.router.navigate([this.localizeRouterService.translateRoute('/admin/recipe')]);
          }, (err) => {
            this.alertService.show(`recipe error ${err}`);
          });
      }
    }
  }

}
