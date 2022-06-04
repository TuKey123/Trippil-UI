import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss'],
})
export class VerifyCodeComponent implements OnInit {
  @Output() sendVerifyCodeEmit = new EventEmitter();

  public verifyCode = '';

  constructor() {}

  ngOnInit(): void {}

  public onSubmit(e: any): void {
    e.preventDefault();

    this.sendVerifyCodeEmit.emit(this.verifyCode);
  }
}
