import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICashRegisterDetailRes } from '@models/cash-register.model';

@Component({
  selector: 'app-update-cash-register-base-modal',
  templateUrl: './update-cash-register-base-modal.component.html',
  styleUrls: ['./update-cash-register-base-modal.component.css'],
})
export class UpdateCashRegisterBaseModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Output() onSubmit = new EventEmitter();
  @Input({ required: true }) timeForm!: FormGroup;
  @Input({ required: true }) cashRegisterDetail!:
    | ICashRegisterDetailRes
    | undefined;

  submit() {
    this.onSubmit.emit();
  }

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }
}
