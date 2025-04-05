import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ITransactionRes,
  IUpdateTransactionDetailDto,
} from '@models/transaction.model';
import { MyHomeService } from '@services/my-home.service';

@Component({
  selector: 'app-update-transaction-detail-form',
  templateUrl: './update-transaction-detail-form.component.html',
  styleUrls: ['./update-transaction-detail-form.component.css'],
})
export class UpdateTransactionDetailFormComponent {
  @Output() onSubmit = new EventEmitter<IUpdateTransactionDetailDto>();
  @Input({ required: true }) transactions!: ITransactionRes[];
  readonly form;

  constructor(private readonly myHomeService: MyHomeService) {
    this.form = this.myHomeService.updateTransactionDetailForm;
  }

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    const time = this.form.value.date;
    const [hours, minutes] = time.split(':');

    const date = new Date();
    date.setUTCHours(hours);
    date.setUTCMinutes(minutes);
    date.setUTCSeconds(0);

    const dto: IUpdateTransactionDetailDto = {
      ...this.form.value,
      tempCode: Number(this.form.value.tempCode),
      date,
    };

    this.onSubmit.emit(dto);
  }
}
