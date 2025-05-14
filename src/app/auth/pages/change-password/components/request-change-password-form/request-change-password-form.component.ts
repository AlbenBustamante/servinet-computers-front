import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-request-change-password-form',
  templateUrl: './request-change-password-form.component.html',
  styleUrls: ['./request-change-password-form.component.css'],
})
export class RequestChangePasswordFormComponent {
  @Output() onSubmit = new EventEmitter<void>();
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) loading!: boolean;

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }
  }
}
