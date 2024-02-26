import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';
import { LittleNavComponent } from './components/little-nav/little-nav.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { LoadingComponent } from './components/loading/loading.component';
import { HeaderTitleComponent } from './components/header-title/header-title.component';

@NgModule({
  declarations: [
    LoginFooterComponent,
    LittleNavComponent,
    ModalComponent,
    LoadingComponent,
    HeaderTitleComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    LoginFooterComponent,
    LittleNavComponent,
    ModalComponent,
    LoadingComponent,
    HeaderTitleComponent,
  ],
})
export class SharedModule {}
