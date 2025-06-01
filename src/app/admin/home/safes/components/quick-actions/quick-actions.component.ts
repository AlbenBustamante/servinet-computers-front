import { Component } from '@angular/core';
import {
  faArrowRightArrowLeft,
  faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
})
export class QuickActionsComponent {
  readonly faBase = faHandHoldingDollar;
  readonly faTransfer = faArrowRightArrowLeft;
}
