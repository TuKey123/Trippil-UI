import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  @Input() set opened(value: boolean) {
    this.isSidePanelOpened = value;
  }

  @Output() disposing = new EventEmitter();

  public isSidePanelOpened = false;

  constructor() {}

  onOptionChanged(e: any): void {
    if (!e.value) {
      this.disposing.emit();
    }
  }
}
