import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { TranslationService } from '../services/translation.service';
import { ActiveModuleService } from '../commonm/services/active-module.service';

@Injectable({
  providedIn: 'root' // Ensure it's provided in root
})
export class CustomTranslateLoader implements TranslateLoader {
  private latestMergedTranslations: any = {}; // ✅ Store latest merged translations

  constructor(private http: HttpClient, private activeModuleService: ActiveModuleService) {}

  getTranslation(lang: string): Observable<any> {
    const commonUrl = `/i18n/${lang}/common.json`;
    const moduleUrl = this.activeModuleService.currentModule()
      ? `/i18n/${lang}/${this.activeModuleService.currentModule()}.json`
      : null;
    if (!moduleUrl) {
      return of({});
    }

    return forkJoin({
      common: this.http.get(commonUrl).pipe(catchError(() => of({}))),
      module: this.http.get(moduleUrl).pipe(catchError(() => of({}))),
    }).pipe(
      map(({ common, module }) => {
        this.latestMergedTranslations = { ...common, ...module }; // ✅ Store merged translations
        return this.latestMergedTranslations;
      })
    );
  }
}
