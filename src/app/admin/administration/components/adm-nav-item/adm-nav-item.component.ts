import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-adm-nav-item',
  templateUrl: './adm-nav-item.component.html',
  styleUrls: ['./adm-nav-item.component.css'],
})
export class AdmNavItemComponent {
  @Input({ required: true }) headline!: string;
  @Input({ required: true }) route!: string;
}
