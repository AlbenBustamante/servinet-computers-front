import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { RequestStatus } from 'src/app/core/models/request-status.model';
import { CampusService } from 'src/app/core/services/campus.service';
import { TransferService } from 'src/app/core/services/transfer.service';
import { GeneralValidators } from 'src/app/core/utils/general-validators';

@Component({
  selector: 'app-new-transfer-form',
  templateUrl: './new-transfer-form.component.html',
  styleUrls: ['./new-transfer-form.component.css'],
})
export class NewTransferFormComponent implements OnInit {
  platforms: IPlatformRes[] | null = null;
  numbers: number[] = [];
  form: FormGroup;
  formStatus: RequestStatus = 'init';
  private readonly maxAmount: number = 10;

  constructor(
    private readonly campusService: CampusService,
    private readonly transferService: TransferService,
    private readonly fb: FormBuilder,
    private readonly validator: GeneralValidators
  ) {
    this.form = this.fb.group({
      platformName: ['', Validators.required],
      value: ['', Validators.required],
      amount: [1, Validators.min(1)],
    });
  }

  ngOnInit(): void {
    this.campusService.platforms$.subscribe((res) => (this.platforms = res));

    for (let i = 1; i <= this.maxAmount; i++) {
      this.numbers.push(i);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.formStatus = 'loading';

    this.transferService.register(this.form.value).subscribe({
      next: (res) => {
        this.formStatus = 'success';
        this.form.reset();
      },
      error: (error) => {
        this.formStatus = 'failed';
      },
    });
  }

  hasError(controlName: string, error: string) {
    return this.validator.hasError(this.form, controlName, error);
  }
}
