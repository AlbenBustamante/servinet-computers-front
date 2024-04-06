import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';
import { LittleNavComponent } from './components/little-nav/little-nav.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { LoadingComponent } from './components/loading/loading.component';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    LoginFooterComponent,
    LittleNavComponent,
    ModalComponent,
    LoadingComponent,
    NavComponent,
    HeaderComponent,
    HeaderTitleComponent,
    ButtonComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    LoginFooterComponent,
    LittleNavComponent,
    ModalComponent,
    LoadingComponent,
    NavComponent,
    HeaderComponent,
    HeaderTitleComponent,
    ButtonComponent,
  ],
})
export class SharedModule {}
