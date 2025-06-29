import { Component } from '@angular/core';
import { DetailService } from '@admin/administration/cash-registers/details/services/detail.service';

@Component({
  selector: 'app-final-working-hour-form',
  templateUrl: './final-working-hour-form.component.html',
})
export class FinalWorkingHourFormComponent {
  readonly form;

  constructor(private readonly service: DetailService) {
    this.form = this.service.timeForm;
  }
}
