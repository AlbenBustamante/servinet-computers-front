import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-my-actions-footer',
  templateUrl: './my-actions-footer.component.html',
  styleUrls: ['./my-actions-footer.component.css'],
})
export class MyActionsFooterComponent {
  @Output() refresh = new EventEmitter();
  @Output() handleTakeBreak = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input({ required: true }) refreshLoading!: boolean;
  @Input({ required: true }) breakLoading!: boolean;
  @Input({ required: true }) showCloseButton!: boolean;
  @Input({ required: true }) myCurrentCashRegisterBreakTitle!: string;
  readonly faRefresh = faRefresh;

  emitRefresh() {
    this.refresh.emit();
  }

  emitHandleTakeBreak() {
    this.handleTakeBreak.emit();
  }

  emitClose() {
    this.close.emit();
  }
}
