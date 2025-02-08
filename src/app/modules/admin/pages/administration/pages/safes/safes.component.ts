import { Component, HostListener, signal, ViewChild } from '@angular/core';
import { UpdateBaseModalComponent } from './components/update-base-modal/update-base-modal.component';
import { SafeBaseService } from '@services/safe-base.service';
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
  readonly selectedSafeDetail;
  readonly safeDetails;
  readonly loading = signal<boolean>(false);
  readonly showDropdown = signal<number | undefined>(undefined);

  readonly options: AdmItemCardOptions = [
    {
      title: 'Ajustar base',
      fn: () => this.openUpdateBaseModal(),
    },
    { title: 'Ver historial', fn: () => {} },
  ];

  constructor(
    private readonly safeDetailService: SafeDetailService,
    private readonly safeBaseService: SafeBaseService
  ) {
    this.safeDetails = this.safeBaseService.safeDetails;
    this.selectedSafeDetail = this.safeBaseService.selectedSafe;
  }

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
    this.showDropdown.set(this.showDropdown() === index ? undefined : index);
    this.selectedSafeDetail.set(this.safeDetails()[index]);
    this.safeBaseService.setSelectedSafe(this.selectedSafeDetail()!);
  }

  openUpdateBaseModal() {
    this.updateBaseModal.open();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (!target.closest('.dropdown')) {
      this.showDropdown.set(undefined);
    }
  }
}
