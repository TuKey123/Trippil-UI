import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Album } from 'src/app/core/models/album';

@Component({
  selector: 'app-album-card',
  templateUrl: './album-card.component.html',
  styleUrls: ['./album-card.component.scss'],
})
export class AlbumCardComponent {
  @Input() album!: Album;
  @Input() showActions = false;

  @Output() clickEmitter = new EventEmitter();
  @Output() removeAlbumEmitter = new EventEmitter();
  @Output() editAlbumEmitter = new EventEmitter();

  constructor() {}

  public onRemoveAlbum(): void {
    this.removeAlbumEmitter.emit();
  }

  public onEditAlbum(): void {
    this.editAlbumEmitter.emit();
  }
}
