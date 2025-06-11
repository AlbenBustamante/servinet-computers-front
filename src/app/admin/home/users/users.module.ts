import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '@shared/shared.module';
import { UsersTableComponent } from './list/components/users-table/users-table.component';
import { NewUserFormComponent } from './list/components/new-user-form/new-user-form.component';
import { FilterByRoleComponent } from './list/components/filter-by-role/filter-by-role.component';
import { FilterByEnabledComponent } from './list/components/filter-by-enabled/filter-by-enabled.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateUserFormComponent } from './list/components/update-user-form/update-user-form.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { JourneysTableComponent } from './details/components/journeys-table/journeys-table.component';
import { HomeSharedModule } from '../home-shared/home-shared.module';
import { MainStatsComponent } from './details/components/main-stats/main-stats.component';

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
    MainStatsComponent,
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
