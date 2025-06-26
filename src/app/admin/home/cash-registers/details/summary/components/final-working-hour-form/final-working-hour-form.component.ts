import { Component } from '@angular/core';
import { DetailService } from '../../../services/detail.service';

@Component({
  selector: 'app-final-working-hour-form',
  templateUrl: './final-working-hour-form.component.html',
  styleUrls: ['./final-working-hour-form.component.css'],
})
export class FinalWorkingHourFormComponent {
  readonly form;

  constructor(private readonly service: DetailService) {
    this.form = this.service.timeForm;
  }
}
