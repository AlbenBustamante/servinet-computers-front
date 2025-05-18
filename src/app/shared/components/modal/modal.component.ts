import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) headline!: string;
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() fontSize: '2xl' | '3xl' = '2xl';
  @Input() width: 'sm' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' = 'lg';

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }

  get mapFontSize() {
    return `text-${this.fontSize}`;
  }

  get mapTextAlign() {
    return `text-${this.align}`;
  }

  get mapMaxWidth() {
    return `max-w-${this.width}`;
  }
}
