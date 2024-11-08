import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-platforms-modal',
  templateUrl: './platforms-modal.component.html',
  styleUrls: ['./platforms-modal.component.css'],
})
export class PlatformsModalComponent {
  @ViewChild('platformsModal') platformsModal!: ElementRef<HTMLDialogElement>;

  open() {
    this.platformsModal.nativeElement.showModal();
  }

  close() {
    this.platformsModal.nativeElement.close();
  }
}
