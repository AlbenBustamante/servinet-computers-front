import { Component, Input } from '@angular/core';
import { ITransactionRes } from '@models/transaction.model';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-update-transaction-detail-form',
  templateUrl: './update-transaction-detail-form.component.html',
  styleUrls: ['./update-transaction-detail-form.component.css'],
})
export class UpdateTransactionDetailFormComponent {
  @Input({ required: true }) transactions!: ITransactionRes[];
  readonly form;

  constructor(private readonly myHomeService: MyHomeService) {
    this.form = this.myHomeService.updateTransactionDetailForm;
  }
}
