import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { DetailService } from '../../services/detail.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-modal',
  templateUrl: './transfer-modal.component.html',
})
export class TransferModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;
  readonly form;
  readonly details;

  constructor(
    private readonly detailService: DetailService,
    private readonly fb: FormBuilder
  ) {
    this.details = this.detailService.details;
    this.form = this.fb.group({
      type: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      denomination: ['', Validators.required],
    });
  }

  get receive() {
    return this.form.get('type')?.value === 'withdrawal';
  }

  get disabled() {
    return this.form.get('type')?.value === '';
  }

  get base() {
    return this.details()?.detailFinalBase;
  }

  onSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    console.log({ value: this.form.value });
  }

  onChangeType() {
    const type = this.form.get('type')?.value;

    if (type !== 'withdrawal') {
      return;
    }

    this.form.patchValue({
      amount: '',
      denomination: '',
    });
  }

  open() {
    this.modal.open();
  }

  close() {
    this.form.patchValue({
      type: '',
      amount: '',
      denomination: '',
    });
    this.modal.close();
  }
}
