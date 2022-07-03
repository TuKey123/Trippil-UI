import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, finalize, Subscription } from 'rxjs';
import { ExploreService } from '../../service/explore.service';
import { ExploreStore } from '../../store/explore.store';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
  public searchTerm$ = this._exploreStore.searchTerm$;
  public items$ = this._exploreStore.items$;

  private _subscription = new Subscription();
  public set subs(value: Subscription) {
    this._subscription.add(value);
  }

  public loading = false;

  constructor(
    private _exploreStore: ExploreStore,
    private _exploreService: ExploreService
  ) {}

  ngOnInit(): void {
    this._exploreStore.setDefaultData();

    this.subs = this.searchTerm$
      .pipe(debounceTime(300))
      .subscribe((searchTerm) => {
        this.loading = true;

        this._exploreService
          .getItems(searchTerm)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe((items) => this._exploreStore.setItemsStore(items));
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public onItemLike(itemId: number): void {
    this._exploreService.likeItem(itemId).subscribe();
  }
}
