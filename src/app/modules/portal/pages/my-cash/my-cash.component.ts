import { Component, signal } from '@angular/core';
import { ICashRegisterRes } from '@models/cash-register.model';
import { CashRegisterDetailService } from '@services/cash-register-detail.service';
import { CashRegisterService } from '@services/cash-register.service';

@Component({
  selector: 'app-my-cash',
  templateUrl: './my-cash.component.html',
  styleUrls: ['./my-cash.component.css'],
})
export class MyCashComponent {
  readonly isOpen = signal<boolean>(false);
  readonly cashRegisters = signal<ICashRegisterRes[]>([]);

  constructor(
    private readonly cashRegisterDetailService: CashRegisterDetailService,
    private readonly cashRegisterService: CashRegisterService
  ) {}

  ngOnInit() {
    this.cashRegisterDetailService.isAlreadyCreated().subscribe({
      next: (alreadyExists) => {
        this.isOpen.set(alreadyExists);

        if (!alreadyExists) {
          this.cashRegisterService.getAll(true).subscribe({
            next: (res) => this.cashRegisters.set(res),
            error: (error) => console.log(error),
          });
        }
      },
      error: (error) => console.log(error),
    });
  }
}
