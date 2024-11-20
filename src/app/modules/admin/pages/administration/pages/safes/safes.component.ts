import { Component, signal } from '@angular/core';
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

  constructor(private readonly safeService: SafeService) {}

  ngOnInit() {
    this.loading.set(true);

    this.safeService.loadDetails().subscribe({
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
}
