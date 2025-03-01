import { Component, signal } from '@angular/core';
import { SafeService } from '@services/safe.service';

@Component({
  selector: 'app-safes',
  templateUrl: './safes.component.html',
  styleUrls: ['./safes.component.css'],
})
export class SafesComponent {
  readonly loading = signal<boolean>(false);

  constructor(private readonly safeService: SafeService) {}

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
