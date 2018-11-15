import { Component, Input, OnInit } from '@angular/core';
import { Media } from '../../../../../media/media';
import { FormGroup } from '@angular/forms';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { AlertService } from '../../../../../popup/alert.service';
import { Ingredient } from '../../../../../../app-recipe/public/ingredient/shared/ingredient';

@Component({
  selector: 'app-admin-recipe-instruction-edit',
  templateUrl: './instruction-edit.component.html',
  styleUrls: ['./instruction-edit.component.scss']
})
export class InstructionEditComponent implements OnInit {

  ingredients: Ingredient[] = [];

  _form: FormGroup;

  imageStorageConfig: {model: string, alt: string};

  downloadURL: string;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
  }

  createImageStorageConfig() {
    if (this.form.get('key') && this.form.get('sentence')) {
      this.imageStorageConfig = {
        model: this.form.get('key').value,
        alt: this.form.get('sentence').value,
      };
    }
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
      this.alertService.show('admin.recipe.image.saved');
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

  @Input() set form(form: FormGroup) {
    this._form = form;
    this.createImageStorageConfig();
  }

  get form(): FormGroup {
    return this._form;
  }
}
