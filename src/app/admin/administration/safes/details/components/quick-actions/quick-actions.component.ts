import { Component, computed, ViewChild } from '@angular/core';
import {
  faArrowRightArrowLeft,
  faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';
import { DetailService } from '@admin/administration/safes/services/detail.service';
import { TransferModalComponent } from '@admin/administration/safes/details/components/transfer-modal/transfer-modal.component';
import { UpdateBaseModalComponent } from '@admin/administration/safes/details/components/update-base-modal/update-base-modal.component';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
})
export class QuickActionsComponent {
  @ViewChild(UpdateBaseModalComponent)
  updateBaseModal!: UpdateBaseModalComponent;
  @ViewChild(TransferModalComponent) transferModal!: TransferModalComponent;

  readonly faBase = faHandHoldingDollar;
  readonly faTransfer = faArrowRightArrowLeft;
  readonly today;
  readonly date;

  readonly disabled = computed(() => {
    const date = this.date();
    const formattedDate = this.detailService.formatDate(date);

    return this.today !== formattedDate;
  });

  constructor(private readonly detailService: DetailService) {
    this.date = this.detailService.date;
    this.today = this.detailService.today;
  }
}
