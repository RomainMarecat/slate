import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Toast } from '../../shared/interfaces/toast';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(private toastService: ToastService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.toastService.toastEmitted
      .subscribe((toast: Toast) => {
        this.toast(toast);
      });
  }

  toast(toast: Toast) {
    if (!toast.classes) {
      toast.classes = '';
    }
    if (!toast.duration) {
      toast.duration = 4000;
    }

    this.openSnackBar(toast);
  }

  openSnackBar(toast: Toast) {
    this.snackBar.open(
      toast.message,
      null,
      {duration: toast.duration, panelClass: toast.classes.split(',')}
    );
  }
}
