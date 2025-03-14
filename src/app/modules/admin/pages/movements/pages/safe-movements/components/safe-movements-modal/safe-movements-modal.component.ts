import { Component, ElementRef, Input, Signal, ViewChild } from '@angular/core';
import { ISafeMovementDto } from '@models/safe.model';

@Component({
  selector: 'app-safe-movements-modal',
  templateUrl: './safe-movements-modal.component.html',
  styleUrls: ['./safe-movements-modal.component.css'],
})
export class SafeMovementsModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) movement!: Signal<ISafeMovementDto | undefined>;

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }
}
