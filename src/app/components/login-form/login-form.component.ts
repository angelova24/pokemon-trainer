import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  @Output() loginSubmit: EventEmitter<NgForm> = new EventEmitter();
// After successfully submitting the login we get the data from user
  onLoginSubmit(form: NgForm): void {
    this.loginSubmit.emit(form);
  }
}
