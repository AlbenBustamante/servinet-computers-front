import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CashRegisterStatus } from '@models/enums';
import { CashRegisterService } from '@services/cash-register.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { CashRegisterStatusPipe } from '@shared/pipes/cash-register-status.pipe';

@Component({
  selector: 'app-cash-registers-table',
  templateUrl: './cash-registers-table.component.html',
  styleUrls: ['./cash-registers-table.component.css'],
})
export class CashRegistersTableComponent {
  @Output() onEdit = new EventEmitter<void>();
  readonly removeLoading = signal<boolean>(false);

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
      {
        key: 'modifiedDate',
        title: 'Fecha de actualización',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortDateTime',
      },
    ],
    body: this.cashRegisterService.cashRegisters,
    noDataMessage: 'Sin cajas registradoras...',
    onClick: (index) => this.goToMovements(index),
    onEdit: (index) => this.emitOnEdit(index),
    onRemove: (index) => this.onRemove(index),
  };

  constructor(
    private readonly cashRegisterService: CashRegisterService,
    private readonly router: Router
  ) {}

  private goToMovements(index: number) {
    const { id } = this.table.body()![index];
    this.router.navigateByUrl(`admin/movimientos/caja-registradora/${id}`);
  }

  private emitOnEdit(index: number) {
    const { id, description, status } =
      this.cashRegisterService.cashRegisters()[index];

    this.cashRegisterService.cashRegisterToUpdateId.set(id);
    this.cashRegisterService.updateCashRegisterForm.patchValue({
      description,
      disabled: status === CashRegisterStatus.DISABLED,
    });

    this.onEdit.emit();
  }

  private onRemove(index: number) {
    if (this.removeLoading()) {
      return;
    }

    const { id } = this.cashRegisterService.cashRegisters()[index];

    this.cashRegisterService.delete(id).subscribe({
      next: () => this.removeLoading.set(true),
      error: (err) => {
        console.log(err);
        this.removeLoading.set(false);
      },
    });
  }
}
