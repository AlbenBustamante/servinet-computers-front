import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '@shared/shared.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { RolePipe } from 'app/core/pipes/role.pipe';
import { EnabledPipe } from 'app/core/pipes/enabled.pipe';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { FilterByRoleComponent } from './components/filter-by-role/filter-by-role.component';
import { FilterByEnabledComponent } from './components/filter-by-enabled/filter-by-enabled.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    UsersComponent,
    UsersListComponent,
    NewUserFormComponent,
    FilterByRoleComponent,
    FilterByEnabledComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    RolePipe,
    EnabledPipe,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
})
export default class UsersModule {}
