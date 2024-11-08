import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './components/header/header.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';
import { ButtonComponent } from './components/button/button.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconButtonComponent } from './components/icon-button/icon-button.component';

@NgModule({
  declarations: [
    NavComponent,
    HeaderComponent,
    HeaderTitleComponent,
    ButtonComponent,
    SpinnerComponent,
    IconButtonComponent,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [
    HeaderComponent,
    NavComponent,
    HeaderTitleComponent,
    ButtonComponent,
    IconButtonComponent,
    SpinnerComponent,
  ],
})
export class SharedModule {}
