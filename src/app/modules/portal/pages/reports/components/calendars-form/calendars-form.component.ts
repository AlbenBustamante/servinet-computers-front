import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestStatus } from '@models/request-status.model';
import { CampusService } from '@services/campus.service';

@Component({
  selector: 'app-calendars-form',
  templateUrl: './calendars-form.component.html',
  styleUrls: ['./calendars-form.component.css'],
})
export class CalendarsFormComponent {
  form: FormGroup;
  transfersStatus: RequestStatus = 'init';

  constructor(
    private readonly fb: FormBuilder,
    private readonly campusService: CampusService
  ) {
    this.form = this.fb.group({
      startDate: [, Validators.required],
      endDate: [, Validators.required],
    });
  }

  ngOnInit() {
    this.transfersStatus = 'loading';

    this.campusService.getTransfers({}).subscribe({
      next: () => (this.transfersStatus = 'success'),
      error: (error) => {
        console.log(error);
        this.transfersStatus = 'failed';
      },
    });
  }

  onSubmit() {
    console.log(this.form.value);

    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.transfersStatus = 'loading';

    this.campusService
      .getTransfers({
        startDate: this.form.get('startDate')?.value,
        endDate: this.form.get('endDate')?.value,
      })
      .subscribe({
        next: () => (this.transfersStatus = 'success'),
        error: (error) => {
          console.log(error);
          this.transfersStatus = 'failed';
        },
      });
  }
}
