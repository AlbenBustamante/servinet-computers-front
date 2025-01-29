import { Component, signal, ViewChild } from '@angular/core';
import { ISafeDetailRes } from '@models/safe.model';
import { UpdateBaseModalComponent } from './components/update-base-modal/update-base-modal.component';
import { UpdateSafeBaseService } from '@services/update-safe-base.service';
import { AdmItemCardOptions } from '../../components/adm-item-card/adm-item-card.component';
import { SafeDetailService } from '@services/safe-detail.service';

@Component({
  selector: 'app-admin-safes',
  templateUrl: './safes.component.html',
  styleUrls: ['./safes.component.css'],
})
export class SafesComponent {
  @ViewChild(UpdateBaseModalComponent)
  updateBaseModal!: UpdateBaseModalComponent;
  readonly loading = signal<boolean>(false);
  readonly safeDetails = signal<ISafeDetailRes[]>([]);
  readonly selectedSafeDetail = signal<ISafeDetailRes | undefined>(undefined);

  readonly options: AdmItemCardOptions = [
    {
      title: 'Ajustar base',
      fn: () => this.openUpdateBaseModal(),
    },
    { title: 'Ver historial', fn: () => {} },
  ];

  constructor(
    private readonly safeDetailService: SafeDetailService,
    private readonly updateSafeBaseService: UpdateSafeBaseService
  ) {}

  ngOnInit() {
    this.loading.set(true);

    this.safeDetailService.loadDetails().subscribe({
      next: (safeDetails) => {
        this.safeDetails.set(safeDetails);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  setSelectedSafeDetail(index: number) {
    this.selectedSafeDetail.set(this.safeDetails()[index]);
    this.updateSafeBaseService.setSelectedSafe(this.selectedSafeDetail()!);
  }

  openUpdateBaseModal() {
    this.updateBaseModal.open();
  }
}
