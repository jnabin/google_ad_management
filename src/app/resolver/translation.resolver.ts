import { effect, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  RedirectCommand,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationResolver implements Resolve<boolean> {
  constructor(private translationService: TranslationService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<boolean | RedirectCommand> {
    const moduleName = route.data['module'] || 'agency-profile'; // Get module name from route data
    console.log(moduleName);
    this.translationService.loadModuleTranslations(moduleName);
    //this.translationService.loadModuleTranslations(moduleName); // ✅ Load translations before activating route

    return of(true); // ✅ Allow navigation once translations are loaded
  }
}
