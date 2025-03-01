import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
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
  readonly table: ITable = {
    header: [
      { key: 'id', title: 'ID', align: 'center' },
      { key: 'name', title: 'Nombres' },
      { key: 'lastName', title: 'Apellidos' },
      { key: 'code', title: 'Código' },
      { key: 'role', title: 'Rol', pipe: new RolePipe() },
      { key: 'enabled', title: 'Estado', pipe: new EnabledPipe() },
      {
        key: 'createdDate',
        title: 'Fecha de registro',
        pipe: new DatePipe('es-CO'),
        pipeArgs: 'shortDateTime',
      },
    ],
    body: this.userService.users,
    noDataMessage: 'Sin usuarios registrados...',
  };

  constructor(private readonly userService: UserService) {}
}
