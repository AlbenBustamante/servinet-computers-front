import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';
import { LittleNavComponent } from './components/little-nav/little-nav.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  declarations: [LoginFooterComponent, LittleNavComponent, ModalComponent],
  imports: [CommonModule, RouterModule],
  exports: [LoginFooterComponent, LittleNavComponent, ModalComponent],
})
export class SharedModule {}
