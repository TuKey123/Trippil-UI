import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AppLoadingService } from 'src/app/core/services';
import { ProfileService } from '../../services/profile.service';
import { ProfileStore } from '../../store';

@Component({
  selector: 'app-items-shared',
  templateUrl: './items-shared.component.html',
  styleUrls: ['./items-shared.component.scss'],
})
export class ItemsSharedComponent implements OnInit {
  public itemsShared$ = this._profileStore.itemsShared$;

  public loading = true;

  constructor(
    private _profileService: ProfileService,
    private _profileStore: ProfileStore
  ) {}

  ngOnInit(): void {
    this._profileStore.userProfile$.subscribe((userProfile) => {
      this._profileService
        .getItemsShared(userProfile.id)
        .pipe(finalize(() => (this.loading = false)))
        .subscribe((items) => this._profileStore.setItemsSharedStore(items));
    });
  }

  public onItemLike(itemId: number): void {
    this._profileService.likeItem(itemId).subscribe();
  }
}
