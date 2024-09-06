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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    SpinnerComponent,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [
    LoginFooterComponent,
    LittleNavComponent,
    ModalComponent,
    LoadingComponent,
    NavComponent,
    HeaderComponent,
    HeaderTitleComponent,
    ButtonComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
