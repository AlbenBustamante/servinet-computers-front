import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '@shared/shared.module';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { FilterByRoleComponent } from './components/filter-by-role/filter-by-role.component';
import { FilterByEnabledComponent } from './components/filter-by-enabled/filter-by-enabled.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    NewUserFormComponent,
    FilterByRoleComponent,
    FilterByEnabledComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export default class UsersModule {}
