import { Component, Input } from '@angular/core';
import { IRoute } from 'src/app/core/models/route.model';

@Component({
  selector: 'app-little-nav',
  templateUrl: './little-nav.component.html',
  styleUrls: ['./little-nav.component.css'],
})
export class LittleNavComponent {
  @Input() routes: IRoute[] = [];
}
