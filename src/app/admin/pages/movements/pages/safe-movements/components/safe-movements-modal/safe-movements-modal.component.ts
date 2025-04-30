import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-safe-movements-modal',
  templateUrl: './safe-movements-modal.component.html',
  styleUrls: ['./safe-movements-modal.component.css'],
})
export class SafeMovementsModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }
}
