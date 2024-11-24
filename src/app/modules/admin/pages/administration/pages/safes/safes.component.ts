import { Component, signal } from '@angular/core';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ISafeDetailRes } from '@models/safe.model';
import { SafeService } from '@services/safe.service';

@Component({
  selector: 'app-admin-safes',
  templateUrl: './safes.component.html',
  styleUrls: ['./safes.component.css'],
})
export class SafesComponent {
  readonly loading = signal<boolean>(false);
  readonly safeDetails = signal<ISafeDetailRes[]>([]);
  readonly faOptions = faEllipsis;
  readonly showDropdown = signal<boolean[]>([]);

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
  }
}
