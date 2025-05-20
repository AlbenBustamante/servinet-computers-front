import { Component, ViewChild } from '@angular/core';
import { ModalComponent } from '@shared/components/modal/modal.component';

@Component({
  selector: 'app-safes-stats-modal',
  templateUrl: './safes-stats-modal.component.html',
  styleUrls: ['./safes-stats-modal.component.css'],
})
export class SafesStatsModalComponent {
  @ViewChild(ModalComponent) modal!: ModalComponent;

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }
}
