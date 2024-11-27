import { Component, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseService } from '@services/base.service';
import { UpdateSafeBaseService } from '@services/update-safe-base.service';

@Component({
  selector: 'app-update-base-form',
  templateUrl: './update-base-form.component.html',
  styleUrls: ['./update-base-form.component.css'],
})
export class UpdateBaseFormComponent {
  readonly safeDetail;
  readonly base;
  readonly form: FormGroup;

  constructor(
    private readonly baseService: BaseService,
    private readonly updateSafeBaseService: UpdateSafeBaseService
  ) {
    this.base = signal(this.baseService.cashBase);

    this.safeDetail = this.updateSafeBaseService.setSelectedSafe;
    this.form = this.updateSafeBaseService.form;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
