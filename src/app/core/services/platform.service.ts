import { Injectable } from '@angular/core';
import { IPlatformRes } from '../models/platform.model';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  platforms: IPlatformRes[];

  constructor() {
    this.platforms = [
      { id: 1, name: 'MoviiRed' },
      { id: 2, name: 'Puntored' },
      { id: 3, name: 'ReFácil' },
      { id: 4, name: 'Recargas' },
      { id: 5, name: 'Venezuela' },
      { id: 6, name: 'Conred' },
    ];
  }

  getAll(): IPlatformRes[] {
    return this.platforms;
  }

  get(id: number): IPlatformRes {
    return this.platforms[id];
  }
}
