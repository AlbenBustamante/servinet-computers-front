import { Component, Input, signal } from '@angular/core';
import { ISafeDetailRes } from '@models/safe.model';
import { SafeService } from '@services/safe.service';

@Component({
  selector: 'app-safe-movements',
  templateUrl: './safe-movements.component.html',
  styleUrls: ['./safe-movements.component.css'],
})
export class SafeMovementsComponent {
  @Input() id!: number;
  readonly loading = signal<boolean>(false);
  readonly details = signal<ISafeDetailRes[]>([]);
  readonly title = signal<string>('');

  constructor(private readonly safeService: SafeService) {}

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
}
