import { Component, signal, ViewChild } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ISafeDetailRes } from '@models/safe.model';
import { SafeService } from '@services/safe.service';
import { UpdateBaseModalComponent } from './components/update-base-modal/update-base-modal.component';

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
  readonly faOptions = faEllipsis;
  readonly showDropdown = signal<boolean[]>([]);
  readonly selectedSafeDetail = signal<ISafeDetailRes | undefined>(undefined);

  constructor(private readonly safeService: SafeService) {}

  ngOnInit() {
    this.loading.set(true);

    this.safeService.loadDetails().subscribe({
      next: (safeDetails) => {
        safeDetails.forEach((_) => {
          this.showDropdown().push(false);
        });

        this.safeDetails.set(safeDetails);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }

  toggleShowDropdown(index: number) {
    this.showDropdown.update((values) => {
      const newValues = values.map((value, i) => (value ? false : index === i));

      return newValues;
    });

    this.selectedSafeDetail.set(this.safeDetails()[index]);
  }

  openUpdateBaseModal() {
    this.updateBaseModal.open();
  }
}
