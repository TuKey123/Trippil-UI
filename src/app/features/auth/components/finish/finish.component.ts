import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss'],
})
export class FinishComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  public onClick(): void {
    this._router.navigate(['/auth/login']);
  }
}
