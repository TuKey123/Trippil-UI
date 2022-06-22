import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { Album } from 'src/app/core/models/album';
import { AlbumService } from '../../services';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  public loading = false;

  public albumId = Number(this._route.snapshot.paramMap.get('id'));
  public albumDetails: Album | undefined;

  constructor(
    private _route: ActivatedRoute,
    private _albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this._albumService
      .getAlbumDetails(this.albumId)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((data) => (this.albumDetails = data));
  }
}
