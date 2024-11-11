import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-safes-stats-modal',
  templateUrl: './safes-stats-modal.component.html',
  styleUrls: ['./safes-stats-modal.component.css'],
})
export class SafesStatsModalComponent {
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;

  open() {
    this.modal.nativeElement.showModal();
  }

  close() {
    this.modal.nativeElement.close();
  }
}
