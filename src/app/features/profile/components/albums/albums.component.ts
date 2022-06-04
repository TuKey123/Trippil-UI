import { Component, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { ProfileService } from '../../services/profile.service';
import { ProfileStore } from '../../store';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  public albums$ = this._profileStore.albums$;
  public isMyProfile$ = this._profileStore.isMyProfile$;

  public loading = false;

  private _subscription = new Subscription();
  public set subs(sub: Subscription) {
    this._subscription.add(sub);
  }

  constructor(
    private _profileService: ProfileService,
    private _profileStore: ProfileStore
  ) {}

  ngOnInit(): void {
    this.subs = this._profileStore.userProfile$.subscribe((userProfile) => {
      this._profileService
        .getUserAlbums(userProfile?.id)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((albums) => this._profileStore.setAlbumsStore(albums));
    });
  }
}
