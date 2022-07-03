import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, finalize, Subscription } from 'rxjs';
import { ExploreService } from '../../service/explore.service';
import { ExploreStore } from '../../store/explore.store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  public searchTerm$ = this._exploreStore.searchTerm$;
  public users$ = this._exploreStore.users$;

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
          .getUsers(searchTerm)
          .pipe(finalize(() => (this.loading = false)))
          .subscribe((users) => this._exploreStore.setUsersStore(users));
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
