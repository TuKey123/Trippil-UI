import { Component, EventEmitter, Output } from '@angular/core';
import { UserInput } from 'src/app/core/models/user';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  @Output() submitFormEmit = new EventEmitter();

  public user: UserInput = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor() {}

  public onSubmit(e: any): void {
    e.preventDefault();

    this.submitFormEmit.emit(this.user);
  }
}
