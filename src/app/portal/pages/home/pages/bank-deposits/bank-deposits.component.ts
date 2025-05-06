import { Component, signal } from '@angular/core';
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { IBankDepositDto } from '@models/bank-deposit.model';
import { BankDepositService } from '@services/bank-deposit.service';

@Component({
  selector: 'app-bank-deposits',
  templateUrl: './bank-deposits.component.html',
  styleUrls: ['./bank-deposits.component.css'],
})
export class BankDepositsComponent {
  readonly loading = signal<boolean>(false);
  readonly bankDeposits = signal<IBankDepositDto[]>([]);
  readonly faAdd = faAdd;

  constructor(private readonly bankDepositService: BankDepositService) {}

  ngOnInit() {
    this.loading.set(true);

    this.bankDepositService.getAllBetween().subscribe({
      next: (bankDeposits) => {
        this.bankDeposits.set(bankDeposits);
        this.loading.set(false);
      },
      error: (err) => {
        console.log(err);
        this.loading.set(false);
      },
    });
  }
}
