import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestStatus } from '@models/request-status.model';

@Component({
  selector: 'app-calendars-form',
  templateUrl: './calendars-form.component.html',
  styleUrls: ['./calendars-form.component.css'],
})
export class CalendarsFormComponent {
  form: FormGroup;
  transfersStatus: RequestStatus = 'init';

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      startDate: [, Validators.required],
      endDate: [, Validators.required],
    });
  }

  ngOnInit() {
    this.transfersStatus = 'loading';
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.transfersStatus = 'loading';
  }
}
