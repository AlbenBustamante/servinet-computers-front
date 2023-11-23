import { Component } from '@angular/core';
import { ICampusRes } from 'src/app/core/models/campus.model';
import { CampusService } from 'src/app/core/services/campus.service';

@Component({
  selector: 'app-campuses-page',
  templateUrl: './campuses.component.html',
  styleUrls: ['./campuses.component.css'],
})
export class CampusesComponent {
  campuses: ICampusRes[];

  constructor(private readonly campusService: CampusService) {
    this.campuses = this.campusService.getAll();
  }
}
