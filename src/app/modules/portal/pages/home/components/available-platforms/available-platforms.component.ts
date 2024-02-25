import { Component, OnInit } from '@angular/core';
import { IPlatformRes } from 'src/app/core/models/platform.model';
import { CampusService } from 'src/app/core/services/campus.service';

@Component({
  selector: 'app-available-platforms',
  templateUrl: './available-platforms.component.html',
  styleUrls: ['./available-platforms.component.css'],
})
export class AvailablePlatformsComponent implements OnInit {
  platforms: IPlatformRes[] | null = null;

  constructor(private readonly campusService: CampusService) {}

  ngOnInit(): void {
    this.campusService.platforms$.subscribe((res) => (this.platforms = res));
  }
}
