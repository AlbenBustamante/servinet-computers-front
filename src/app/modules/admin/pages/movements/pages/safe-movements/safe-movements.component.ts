import { Component, effect, Input, signal, ViewChild } from '@angular/core';
import { ISafeDetailRes, ISafeMovementDto } from '@models/safe.model';
import { SafeDetailService } from '@services/safe-detail.service';
import { SafeService } from '@services/safe.service';
import { SafeMovementsModalComponent } from './components/safe-movements-modal/safe-movements-modal.component';

@Component({
  selector: 'app-safe-movements',
  templateUrl: './safe-movements.component.html',
  styleUrls: ['./safe-movements.component.css'],
})
export class SafeMovementsComponent {
  @ViewChild(SafeMovementsModalComponent) modal!: SafeMovementsModalComponent;
  @Input() id!: number;
  readonly loading = signal<boolean>(false);
  readonly details = signal<ISafeDetailRes[]>([]);
  readonly title = signal<string>('');
  readonly modalLoading = signal<boolean>(false);
  readonly selectedMovement = signal<ISafeMovementDto | undefined>(undefined);

  constructor(
    private readonly safeService: SafeService,
    private readonly safeDetailService: SafeDetailService
  ) {
    effect(() => {
      const loading = this.modalLoading();
      console.log({ loading });
    });
  }

  ngOnInit() {
    this.loading.set(true);

    this.safeService.getDetails(this.id).subscribe({
      next: (details) => {
        this.title.set(`Movimientos de Caja Fuerte N° ${this.id}`);
        this.details.set(details);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  openModal(safeDetailId: number) {
    if (this.modalLoading()) {
      return;
    }

    if (safeDetailId === this.selectedMovement()?.safeDetail.id) {
      return this.modal.open();
    }

    this.modalLoading.set(true);

    this.safeDetailService.getMovements(safeDetailId).subscribe({
      next: (movement) => {
        this.selectedMovement.set(movement);
        this.modalLoading.set(false);
        this.modal.open();
      },
      error: (err) => {
        console.error(err);
        this.modalLoading.set(false);
      },
    });
  }
}
