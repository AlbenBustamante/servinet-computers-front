import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-nav-item',
  templateUrl: './home-nav-item.component.html',
})
export class HomeNavItemComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) route!: string;
}
