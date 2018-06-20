import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

export class State {
  constructor(public name: string, public population: string, public flag: string) {
  }
}

export class Instructor {
  firstname: string;
  lastname: string;
  picture?: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: [ './autocomplete.component.scss' ]
})
export class AutocompleteComponent implements OnInit {

  stateCtrl: FormControl = new FormControl();
  instructorCtrl: FormControl = new FormControl();

  filteredStates: Observable<any[]>;
  filteredInstructors: any;
  instructors: Instructor[];
  states: State[];

  constructor() {
    this.filteredStates = this.stateCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this.filterStates(state) : this.states.slice())
      );

    this.filteredInstructors = this.instructorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(val => val ? this.filterInstructors(val) : this.instructors.slice())
      )
    ;
  }

  ngOnInit() {
    this.states = [ {
      name: 'Arkansas',
      population: '2.978M',
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
      {
        name: 'California',
        population: '39.14M',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
      },
      {
        name: 'Florida',
        population: '20.27M',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
      },
      {
        name: 'Texas',
        population: '27.47M',
        flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
      }
    ];

    this.instructors = [ {
      firstname: 'Kara',
      lastname: 'Evans',
      picture: 'http://placehold.it/32x32'
    },
      {
        firstname: 'Cochran',
        lastname: 'Munoz',
        picture: 'http://placehold.it/32x32'
      },
      {
        firstname: 'Guerra',
        lastname: 'Frost',
        picture: 'http://placehold.it/32x32'
      },
      {
        firstname: 'Aisha',
        lastname: 'Farmer',
        picture: 'http://placehold.it/32x32'
      },
      {
        firstname: 'Dorothea',
        lastname: 'Barry',
        picture: 'http://placehold.it/32x32'
      }
    ];
  }

  filterStates(name: string): State[] {
    return this.states.filter(state =>
    state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  filterInstructors(val: string): Instructor[] {
    return this.instructors.filter(instructor =>
      instructor.firstname.toLowerCase().indexOf(val.toLowerCase()) >= 0 ||
      instructor.lastname.toLowerCase().indexOf(val.toLowerCase()) >= 0
    );
  }

  onInstructorSelected(instructor: Instructor) {
  }
}
