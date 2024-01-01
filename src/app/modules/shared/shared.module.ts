import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';
import { LittleNavComponent } from './components/little-nav/little-nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderTitleComponent,
    LoginFooterComponent,
    LittleNavComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [HeaderTitleComponent, LoginFooterComponent, LittleNavComponent],
})
export class SharedModule {}
