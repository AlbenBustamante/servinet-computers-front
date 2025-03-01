import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CashRegisterService } from '@services/cash-register.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { CashRegisterStatusPipe } from '@shared/pipes/cash-register-status.pipe';

@Component({
  selector: 'app-cash-registers-table',
  templateUrl: './cash-registers-table.component.html',
  styleUrls: ['./cash-registers-table.component.css'],
})
export class CashRegistersTableComponent {
  readonly cashRegisters;
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'numeral', title: 'Numeral', align: 'center' },
      { key: 'description', title: 'Nota' },
      { key: 'status', title: 'Estado', pipe: new CashRegisterStatusPipe() },
      {
        key: 'createdDate',
        title: 'Fecha de creación',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortDateTime',
      },
    ],
    body: this.cashRegisterService.cashRegisters,
    onClick: (index) => this.goToMovements(index),
    noDataMessage: 'Sin cajas registradoras...',
  };

  constructor(
    private readonly cashRegisterService: CashRegisterService,
    private readonly router: Router
  ) {
    this.cashRegisters = this.cashRegisterService.cashRegisters;
  }

  private goToMovements(index: number) {
    const { id } = this.cashRegisters()[index];
    this.router.navigateByUrl(`admin/movimientos/caja-registradora/${id}`);
  }
}
