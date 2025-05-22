import { Component, Input, signal } from '@angular/core';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {
  @Input({ required: true }) routes!: IRoute[];
  readonly showNavBar = signal<boolean>(false);

  toggleShowNavBar() {
    this.showNavBar.update((prevValue) => !prevValue);
  }
}
