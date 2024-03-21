import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPlatformRes } from '@models/platform.model';
import { RequestStatus } from '@models/request-status.model';
import { CampusService } from '@services/campus.service';
import { TransferService } from '@services/transfer.service';
import { GeneralValidators } from '@utils/general-validators';

@Component({
  selector: 'app-new-transfer-form',
  templateUrl: './new-transfer-form.component.html',
  styleUrls: ['./new-transfer-form.component.css'],
})
export class NewTransferFormComponent {
  formStatus: RequestStatus = 'init';
  readonly platforms = signal<IPlatformRes[]>([]);
  readonly numbers = signal<number[]>([]);
  readonly form: FormGroup;
  private readonly maxAmount: number = 10;

  constructor(
    private readonly campusService: CampusService,
    private readonly transferService: TransferService,
    private readonly fb: FormBuilder,
    private readonly validator: GeneralValidators
  ) {
    for (let i = 1; i <= this.maxAmount; i++) {
      this.numbers.update((prevNumbers) => [...prevNumbers, i]);
    }

    this.form = this.fb.group({
      platformName: ['', Validators.required],
      value: ['', Validators.required],
      amount: [1, Validators.min(1)],
    });
  }

  ngOnInit(): void {
    this.campusService
      .getPlatforms()
      .subscribe((res) => this.platforms.set(res.data.results[0].platforms));
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.formStatus = 'loading';

    this.transferService.register(this.form.value).subscribe({
      next: () => {
        this.formStatus = 'success';
        this.form.reset();

        this.campusService.getTransfers({}).subscribe();
      },
      error: (error) => {
        console.log(error);
        this.formStatus = 'failed';
      },
    });
  }

  hasError(controlName: string, error: string) {
    return this.validator.hasError(this.form, controlName, error);
  }
}
