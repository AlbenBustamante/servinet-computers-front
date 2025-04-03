import { Component, Input } from '@angular/core';
import { ITransactionRes } from '@models/transaction.model';

@Component({
  selector: 'app-update-transaction-detail-form',
  templateUrl: './update-transaction-detail-form.component.html',
  styleUrls: ['./update-transaction-detail-form.component.css'],
})
export class UpdateTransactionDetailFormComponent {
  @Input({ required: true }) transactions!: ITransactionRes[];
}
