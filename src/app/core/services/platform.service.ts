import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { checkToken } from '@interceptors/token.interceptor';
import {
  IAdminPlatformDto,
  IPlatformReq,
  IPlatformRes,
  IPortalPlatform,
  IUpdatePlatformDto,
} from '@models/platform.model';
import { tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  private readonly url: string = `${environment.apiUrl}/platforms`;
  readonly platforms = signal<IPlatformRes[]>([]);
  readonly balanceEditing = signal<boolean>(false);
  readonly portalPlatforms = signal<IPortalPlatform[]>([]);
  readonly selectedPortalPlatform = signal<IPortalPlatform | null>(null);
  readonly selectedPortalPlatformIndex = signal<number | null>(null);
  readonly updatePlatformLoading = signal<boolean>(false);
  readonly updatePlatformForm: FormGroup;
  readonly platformToUpdateId = signal<number>(-1);

  constructor(
    private readonly http: HttpClient,
    private readonly fb: FormBuilder
  ) {
    this.updatePlatformForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  register(req: IPlatformReq) {
    return this.http
      .post<IPlatformRes>(this.url, req, {
        context: checkToken(),
      })
      .pipe(
        tap((platform) =>
          this.platforms.update((prevValue) => [...prevValue, platform])
        )
      );
  }

  getAll() {
    return this.http
      .get<IPlatformRes[]>(this.url, {
        context: checkToken(),
      })
      .pipe(tap((platforms) => this.platforms.set(platforms)));
  }

  getDetails(platformId: number, date: string) {
    const params = new HttpParams().append('date', date);

    return this.http.get<IAdminPlatformDto>(
      `${this.url}/${platformId}/details`,
      { context: checkToken(), params }
    );
  }

  loadPortalPlatforms() {
    return this.http
      .get<IPortalPlatform[]>(`${this.url}/portal`, {
        context: checkToken(),
      })
      .pipe(
        tap((portalPlatforms) => this.portalPlatforms.set(portalPlatforms))
      );
  }

  update(platformId: number, dto: IUpdatePlatformDto) {
    return this.http.patch<IPlatformRes>(`${this.url}/${platformId}`, dto, {
      context: checkToken(),
    });
  }

  delete(platformId: number) {
    return this.http.delete<Boolean>(`${this.url}/${platformId}`, {
      context: checkToken(),
    });
  }
}
