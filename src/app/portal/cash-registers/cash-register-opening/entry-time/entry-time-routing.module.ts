import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntryTimeComponent } from './entry-time.component';

const routes: Routes = [{ path: '', component: EntryTimeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntryTimeRoutingModule {}
