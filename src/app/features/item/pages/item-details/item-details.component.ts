import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';
import { AppLoadingService, AuthService } from 'src/app/core/services';
import { TripDetailService } from 'src/app/features/trip/services';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit {
  public id = Number(this._route.snapshot.paramMap.get('id'));

  public owner!: User;
  public itemDetail!: TripItem & { ownerId: number };
  public usersSharedItem!: (User & { numberOfLikes?: number })[];

  public itemDetailsRequest = this._itemService.getItemDetail(this.id);
  public usersSharedRequest = this._tripDetailService.usersSharedItem(this.id);
  public itemOwnerRequest = this._itemService.getItemOwner(this.id);

  public userProfile$ = this._authService.userProfile$;

  constructor(
    private _appLoadingService: AppLoadingService,
    private _authService: AuthService,
    private _itemService: ItemService,
    private _tripDetailService: TripDetailService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._appLoadingService.show();

    forkJoin([
      this.itemDetailsRequest,
      this.usersSharedRequest,
      this.itemOwnerRequest,
    ])
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe(([itemDetails, users, owner]) => {
        this.itemDetail = itemDetails;

        this.usersSharedItem = users.sort((previous, current) =>
          current.numberOfLikes > previous.numberOfLikes ? 1 : -1
        );

        this.owner = owner;
      });
  }

  public onItemSaveChanges(item: TripItem): void {
    this._appLoadingService.show();

    this._tripDetailService
      .updateTripItem({
        id: item.id,
        trip: item.trip,
        lat: item.lat,
        lng: item.lng,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        note: item.note,
        image: item.image,
        description: item.description,
      })
      .pipe(finalize(() => this._appLoadingService.hide()))
      .subscribe();
  }

  public onItemShare(item: TripItem): void {
    this._tripDetailService.shareItem(item.id, item.isShared).subscribe();
  }

  public onItemLike(item: TripItem): void {
    this._tripDetailService.likeItem(item.id).subscribe();
  }
}
