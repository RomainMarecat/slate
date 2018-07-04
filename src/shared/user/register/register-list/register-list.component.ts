import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.scss']
})
export class RegisterListComponent implements OnInit {

  features = [
    {link: 'register1', name: 'user.list.registers.register1.name'},
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateTo(link: string) {
    this.router.navigate(['users/registers/' + link]);
  }
}
