import { Component, Input } from '@angular/core';
import { IRoute } from '@models/route.model';

@Component({
  selector: 'app-little-nav',
  templateUrl: './little-nav.component.html',
  styleUrls: ['./little-nav.component.css'],
})
export class LittleNavComponent {
  @Input() routes: IRoute[] = [];
}
