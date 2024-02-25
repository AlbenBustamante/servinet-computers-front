import { Component } from '@angular/core';
import { CampusService } from 'src/app/core/services/campus.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css'],
})
export class PortalComponent {
  constructor(private readonly campusService: CampusService) {}

  ngOnInit(): void {
    this.campusService.getPlatforms().subscribe();
  }
}
