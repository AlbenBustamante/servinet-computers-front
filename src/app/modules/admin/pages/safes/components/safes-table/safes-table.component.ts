import { Component, signal } from '@angular/core';
import { SafeService } from '@services/safe.service';

@Component({
  selector: 'app-safes-table',
  templateUrl: './safes-table.component.html',
  styleUrls: ['./safes-table.component.css'],
})
export class SafesTableComponent {
  readonly safes;
  readonly loading = signal<boolean>(false);

  constructor(private readonly safeService: SafeService) {
    this.safes = this.safeService.safes;
  }

  ngOnInit() {
    this.loading.set(false);

    this.safeService.getAll().subscribe({
      next: (_) => {
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
