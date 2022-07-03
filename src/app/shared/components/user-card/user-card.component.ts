import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() data!: User;

  public detailsLink!: string;

  constructor() {}

  ngOnInit(): void {
    this.detailsLink = `/profile/public/${this.data.id}`;
  }
}
