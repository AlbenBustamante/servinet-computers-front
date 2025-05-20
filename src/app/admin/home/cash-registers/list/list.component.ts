import { Component, signal, ViewChild } from '@angular/core';
import { CashRegisterService } from '@services/cash-register.service';
import { UpdateCashRegisterFormComponent } from '@admin/home/cash-registers/components/update-cash-register-form/update-cash-register-form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @ViewChild(UpdateCashRegisterFormComponent)
  updateCashRegisterForm!: UpdateCashRegisterFormComponent;

  readonly loading = signal<boolean>(false);
  readonly showSideBar = signal<boolean>(false);
  readonly updateCashRegisterLoading;

  constructor(private readonly cashRegisterService: CashRegisterService) {
    this.updateCashRegisterLoading =
      this.cashRegisterService.updateCashRegisterLoading;
  }

  ngOnInit() {
    this.loading.set(true);

    this.cashRegisterService.getAll().subscribe({
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
