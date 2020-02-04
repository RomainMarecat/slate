import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent {
  @Input() panelClass: string;
  @Input() nullable: boolean;
  @Input() appearance = 'outline';
  @Input() placeholder = 'Enter your date';

  @Input() parentForm: FormGroup;
  @Input() formInnerControlName: string;
}
