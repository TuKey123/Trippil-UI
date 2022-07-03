import { Component, OnInit } from '@angular/core';
import { ExploreStore } from '../../store/explore.store';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit {
  constructor(private _exploreStore: ExploreStore) {}

  ngOnInit(): void {}

  public onSearchChange(value: string): void {
    this._exploreStore.setSerchTermStore(value);
  }
}
