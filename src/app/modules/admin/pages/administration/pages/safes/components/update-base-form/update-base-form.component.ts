import { Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISafeDetailRes } from '@models/safe.model';
import { BaseService } from '@services/base.service';

@Component({
  selector: 'app-update-base-form',
  templateUrl: './update-base-form.component.html',
  styleUrls: ['./update-base-form.component.css'],
})
export class UpdateBaseFormComponent {
  @Input({ required: true }) safeDetail!: ISafeDetailRes | undefined;
  readonly base;
  readonly form: FormGroup;

  constructor(
    private readonly baseService: BaseService,
    private readonly fb: FormBuilder
  ) {
    this.base = signal(this.baseService.cashBase);

    const safeBase = this.safeDetail?.detailFinalBase;

    this.form = this.fb.group({
      hundredThousand: [safeBase?.hundredThousand, Validators.min(0)],
      fiftyThousand: [safeBase?.twoThousand, Validators.min(0)],
      twentyThousand: [safeBase?.twentyThousand, Validators.min(0)],
      tenThousand: [safeBase?.tenThousand, Validators.min(0)],
      fiveThousand: [safeBase?.fiveThousand, Validators.min(0)],
      twoThousand: [safeBase?.twoThousand, Validators.min(0)],
      thousand: [safeBase?.thousand, Validators.min(0)],
      fiveHundred: [safeBase?.fiveHundred, Validators.min(0)],
      twoHundred: [safeBase?.twoHundred, Validators.min(0)],
      hundred: [safeBase?.hundred, Validators.min(0)],
      fifty: [safeBase?.fifty, Validators.min(0)],
    });

    console.log(safeBase);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
