import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { filter, finalize, map } from 'rxjs';
import { TripItem } from 'src/app/core/models/trip';
import { User } from 'src/app/core/models/user';
import { AppLoadingService, UploadFileService } from 'src/app/core/services';
import { TAB_ITEMS } from 'src/app/features/trip/constants';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit, OnDestroy {
  @Input() set itemDetail(value: TripItem) {
    this.data = { ...value };
  }
  @Input() usersShared!: (User & { numberOfLikes?: number; itemId?: number })[];
  @Input() canEdit!: boolean;

  @Output() saveChangesEmit = new EventEmitter();
  @Output() shareEmit = new EventEmitter();
  @Output() likeEmit = new EventEmitter();
  @Output() navigateEmit = new EventEmitter();

  public tabItems = TAB_ITEMS;

  public data!: TripItem;

  public activatedTab!: number;
  public showUsersSharedPopup = false;

  public editor: Editor = new Editor();
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(
    private _appLoadingService: AppLoadingService,
    private _uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {
    this.activatedTab = 0;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public onSave(): void {
    this.saveChangesEmit.emit(this.data);
  }

  public onShare(): void {
    this.data.isShared = !this.data.isShared;
    this.shareEmit.emit(this.data);
  }

  public onLike(): void {
    this.data.isLiked = !this.data.isLiked;

    this.data.numberOfLikes =
      (this.data.numberOfLikes as number) + (this.data.isLiked ? 1 : -1);

    this.likeEmit.emit(this.data);
  }

  public onFileSelect(event: any): void {
    this._appLoadingService.show();

    const files = [event.target.files['0']];
    this._uploadFileService
      .uploadImage(files)
      .pipe(
        map((data) => (data as any).body),
        filter((data) => !!data),
        finalize(() => this._appLoadingService.hide())
      )
      .subscribe((data) => (this.data.image = data.image));
  }

  public onRemoveImage(): void {
    this.data.image = '';
  }
}
