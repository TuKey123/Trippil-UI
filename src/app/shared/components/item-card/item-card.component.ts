import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TripItem } from 'src/app/core/models/trip';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent implements OnInit {
  @Input() public set data(value: TripItem) {
    this.item = { ...value };
    this.detailsLink = `/items/${this.item?.id}`;
  }

  @Output() likeItemEmitter = new EventEmitter();

  public item!: TripItem;
  public detailsLink!: string;

  constructor() {}

  ngOnInit(): void {}

  public onLikeItem(): void {
    this.item.isLiked = !this.item.isLiked;
    this.item.numberOfLikes =
      Number(this.item?.numberOfLikes) + (this.item.isLiked ? 1 : -1);

    this.likeItemEmitter.emit(this.item.isLiked);
  }
}
