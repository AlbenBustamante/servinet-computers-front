import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';

@NgModule({
  declarations: [HeaderTitleComponent, LoginFooterComponent],
  imports: [CommonModule],
  exports: [HeaderTitleComponent, LoginFooterComponent],
})
export class SharedModule {}
