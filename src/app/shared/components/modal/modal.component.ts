import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) headline!: string;
  @Input() width: 'sm' | 'lg' = 'lg';

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }

  get maxWidth() {
    return `max-w-${this.width}`;
  }
}
