import { Component, EventEmitter, Output } from '@angular/core';
import { faAdd, faTools } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-platform-details-quick-actions',
  templateUrl: './platform-details-quick-actions.component.html',
  styleUrls: ['./platform-details-quick-actions.component.css'],
})
export class PlatformDetailsQuickActionsComponent {
  @Output() onEditBalances = new EventEmitter<void>();
  @Output() onNewTransfer = new EventEmitter<void>();
  readonly faAdd = faAdd;
  readonly faEdit = faTools;
}
