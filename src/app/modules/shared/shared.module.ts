import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';
import { LittleNavComponent } from './components/little-nav/little-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginFooterComponent, LittleNavComponent],
  imports: [CommonModule, RouterModule],
  exports: [LoginFooterComponent, LittleNavComponent],
})
export class SharedModule {}
