import { Component, computed, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICashRegisterDetailRes } from '@models/cash-register.model';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  private readonly id: number;
  readonly loading = signal<boolean>(false);
  readonly detail = signal<ICashRegisterDetailRes | undefined>(undefined);
  readonly title = computed(
    () => `Caja Registradora N° ${this.detail()?.cashRegister.numeral}`
  );

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cashRegisterService: CashRegisterService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterService.getLastDetail(this.id).subscribe({
      next: (detail) => {
        this.detail.set(detail);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
