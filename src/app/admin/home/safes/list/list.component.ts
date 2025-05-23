import { Component, signal } from '@angular/core';
import { SafeService } from '@services/safe.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent {
  readonly showRegisterForm = signal<boolean>(false);
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
