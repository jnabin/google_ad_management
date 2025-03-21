import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CustomTranslateLoader } from '../loaders/custom-translate-loader';
import { HttpClient } from '@angular/common/http';
import { ActiveModuleService } from '../commonm/services/active-module.service';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLanguage = signal('en');

  constructor(
    private translate: TranslateService, private activeModuleService: ActiveModuleService) {
    this.translate.setDefaultLang(this.currentLanguage());
    this.translate.use(this.currentLanguage());
  }
 
  switchLanguage(lang: string){
    this.currentLanguage.set(lang);
    this.translate.use(lang);
  }

  loadModuleTranslations(moduleName: string) {
    this.activeModuleService.currentModule.set(moduleName); // ✅ Set active module before loading translations
    console.log(moduleName);
    this.translate.reloadLang(this.currentLanguage());
  }
}
