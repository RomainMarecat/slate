import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Filter } from '../shared/filter';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-facet-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  @Input() form: FormGroup;
  @Output() filtered: EventEmitter < Filter > = new EventEmitter < Filter > ();
  options: Array < string > ;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.options = [
      'France',
      'Canada',
      'Etat-Unis',
    ];
    this.form = this.formBuilder.group({
      country: ['', Validators.required]
    });
  }

  get country() {
    return this.form.get('country');
  }

  onFilter(selectChange: MatSelectChange) {
    this.filtered.emit({ value: selectChange.value, operator: '==', column: 'country' });
  }
}
