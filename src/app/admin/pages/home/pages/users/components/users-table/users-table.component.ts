import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { UserService } from '@services/user.service';
import { ITable } from '@shared/components/custom-table/custom-table.component';
import { EnabledPipe } from '@shared/pipes/enabled.pipe';
import { RolePipe } from '@shared/pipes/role.pipe';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent {
  @Output() onEdit = new EventEmitter();
  readonly removeLoading = signal<boolean>(false);

  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'name', title: 'Nombres' },
      { key: 'lastName', title: 'Apellidos' },
      { key: 'email', title: 'Email' },
      { key: 'code', title: 'Código' },
      { key: 'role', title: 'Rol', pipe: new RolePipe() },
      { key: 'enabled', title: 'Estado', pipe: new EnabledPipe() },
      {
        key: 'createdDate',
        title: 'Fecha de registro',
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
    body: this.userService.users,
    noDataMessage: 'Sin usuarios registrados...',
    onEdit: (index) => this.emitOnEdit(index),
    onRemove: (index) => this.onRemove(index),
  };

  constructor(private readonly userService: UserService) {}

  emitOnEdit(index: number) {
    const { id, name, lastName, role } = this.userService.users()[index];
    this.userService.userToUpdateId.set(id);
    this.userService.updateUserForm.patchValue({ name, lastName, role });
    this.onEdit.emit();
  }

  onRemove(index: number) {
    if (this.removeLoading()) {
      return;
    }

    this.removeLoading.set(true);

    const { id } = this.userService.users()[index];

    this.userService.delete(id).subscribe({
      next: (_) => this.removeLoading.set(false),
      error: (err) => {
        console.log(err);
        this.removeLoading.set(true);
      },
    });
  }
}
