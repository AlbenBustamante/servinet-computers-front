import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    ],
    body: this.cashRegisterService.cashRegisters,
    noDataMessage: 'Sin cajas registradoras...',
    onClick: (index) => this.goToDetails(index),
    onEdit: (index) => this.emitOnEdit(index),
    onRemove: (index) => this.onRemove(index),
  };

  constructor(
    private readonly cashRegisterService: CashRegisterService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  private goToDetails(index: number) {
    const { id } = this.table.body()![index];
    this.router.navigate([id], { relativeTo: this.route });
  }

  private emitOnEdit(index: number) {
    const { id, description, status } =
      this.cashRegisterService.cashRegisters()[index];

    const disabled = status === CashRegisterStatus.DISABLED;

    this.cashRegisterService.cashRegisterToUpdateId.set(id);
    this.cashRegisterService.updateCashRegisterForm.patchValue({
      description,
      disabled,
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
