import { Component, inject } from '@angular/core';
import { TestService } from '@services/test.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private readonly testService = inject(TestService);

  ngOnInit() {
    interval(300000).subscribe(() => this.testService.pong().subscribe());
  }
}
