import { Component, OnInit } from '@angular/core';
import { IPlatformDashboardResponse } from 'src/app/core/models/dashboard.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent implements OnInit {
  platforms: IPlatformDashboardResponse[] | null = null;

  constructor(private readonly userService: UserService) {}

  ngOnInit() {
    this.userService
      .getReport()
      .subscribe((res) => (this.platforms = res.platforms));
  }
}
