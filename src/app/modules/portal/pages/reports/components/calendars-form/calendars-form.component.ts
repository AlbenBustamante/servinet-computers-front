import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateRangeService } from '@services/date-range.service';

@Component({
  selector: 'app-calendars-form',
  templateUrl: './calendars-form.component.html',
  styleUrls: ['./calendars-form.component.css'],
})
export class CalendarsFormComponent {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dateRangeService: DateRangeService
  ) {
    this.form = this.fb.group({
      startDate: [, Validators.required],
      endDate: [, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.dateRangeService.setDateRange(this.form.value);
  }
}
