import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { FilterByRoleComponent } from './components/filter-by-role/filter-by-role.component';
import { FilterByEnabledComponent } from './components/filter-by-enabled/filter-by-enabled.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUserFormComponent } from './components/update-user-form/update-user-form.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { JourneysTableComponent } from './components/journeys-table/journeys-table.component';
import { HomeSharedModule } from '../home-shared/home-shared.module';

@NgModule({
  declarations: [
    UsersTableComponent,
    NewUserFormComponent,
    FilterByRoleComponent,
    FilterByEnabledComponent,
    UpdateUserFormComponent,
    ListComponent,
    DetailsComponent,
    JourneysTableComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HomeSharedModule,
  ],
})
export default class UsersModule {}
