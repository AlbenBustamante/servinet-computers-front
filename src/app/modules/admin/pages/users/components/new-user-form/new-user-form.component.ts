import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css'],
})
export class NewUserFormComponent {
  @Output() onCancel = new EventEmitter();

  emitOnCancel() {
    this.onCancel.emit();
  }
}
