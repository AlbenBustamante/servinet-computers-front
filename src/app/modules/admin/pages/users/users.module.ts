import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '@shared/shared.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RolePipe } from 'app/core/pipes/role.pipe';

@NgModule({
  declarations: [UsersComponent, UsersListComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule, RolePipe],
})
export default class UsersModule {}
