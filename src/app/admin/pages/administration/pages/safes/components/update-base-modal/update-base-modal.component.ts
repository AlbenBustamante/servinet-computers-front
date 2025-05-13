import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ISafeDetailRes } from '@models/safe.model';

@Component({
  selector: 'app-update-base-modal',
  templateUrl: './update-base-modal.component.html',
  styleUrls: ['./update-base-modal.component.css'],
})
export class UpdateBaseModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  @Input({ required: true }) safeDetail!: ISafeDetailRes | undefined;

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }
}
