import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Album } from 'src/app/core/models/album';
import { Trip } from 'src/app/core/models/trip';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.scss'],
})
export class TripCardComponent implements OnInit {
  @Input() public set data(value: Trip) {
    this.trip = { ...value };
  }
  @Input() albums!: Album[];
  @Input() showActions = false;

  @Output() saveAlbumSelectionEmit = new EventEmitter();

  public trip!: Trip;
  public popupVisible = false;

  constructor() {}

  ngOnInit(): void {}

  public onAddToAlbum(): void {
    this.popupVisible = !this.popupVisible;
  }

  public onRemoveTrip(): void {}

  public onAlbumChanged(album: Album): void {
    if (this.trip.album === album.id) {
      this.trip.album = 0;
      return;
    }

    this.trip.album = album.id;
  }

  public saveAlbumSelection(): void {
    this.popupVisible = !this.popupVisible;

    this.saveAlbumSelectionEmit.emit(this.trip);
  }
}
