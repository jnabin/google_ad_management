import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveModuleService {
  currentModule = signal('');
}
