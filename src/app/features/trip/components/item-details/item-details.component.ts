import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { finalize, map } from 'rxjs';
import { TripItem } from 'src/app/core/models/trip';
import { AppLoadingService, UploadFileService } from 'src/app/core/services';
import { TAB_ITEMS } from '../../constants';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss'],
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
  @Input() set itemDetail(value: TripItem) {
    this.data = { ...value };
  }

  @Output() saveChangesEmit = new EventEmitter();

  public tabItems = TAB_ITEMS;

  public data!: TripItem;

  public activatedTab = 0;

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

  public html: any;

  constructor(
    private _appLoadingService: AppLoadingService,
    private _uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  public onSave(): void {
    this.saveChangesEmit.emit(this.data);
  }

  public onFileSelect(event: any): void {
    this._appLoadingService.show();

    const files = [event.target.files['0']];
    this._uploadFileService
      .uploadImage(files)
      .pipe(
        map((data) => {
          const res = data as any;
          return res.body;
        }),
        finalize(() => this._appLoadingService.hide())
      )
      .subscribe((data) => {
        if (!data) return;
        this.data.image = data.image;
      });
  }

  public onRemoveImage(): void {
    this.data.image = '';
  }
}
