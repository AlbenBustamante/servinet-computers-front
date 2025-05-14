import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-temp-code-form',
  templateUrl: './password-temp-code-form.component.html',
  styleUrls: ['./password-temp-code-form.component.css'],
})
export class PasswordTempCodeFormComponent {
  @Output() onSubmit = new EventEmitter<void>();
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) loading!: boolean;

  emitOnSubmit() {
    if (this.form.invalid) {
      return this.form.markAllAsTouched();
    }

    this.onSubmit.emit();
  }
}
