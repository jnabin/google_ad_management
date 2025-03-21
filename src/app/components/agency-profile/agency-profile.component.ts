import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, inject, InjectionToken, Injector, OnInit, signal, WritableSignal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AgencyInfoComponent } from './agency-info/agency-info.component';
import { BrandingPreferencesComponent } from './branding-preferences/branding-preferences.component';
import { InvoiceInfoComponent } from './invoice-info/invoice-info.component';
import { AgencyFormDto, AgencyFormWrapperDto, AgencyInvoiceSettingsFormDto } from '../../models/agency-profile';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

export const AGENCY_FORM_DATA = new InjectionToken<WritableSignal<AgencyFormWrapperDto>>('agencyFormData');
export const SAVE_FORM = new InjectionToken<WritableSignal<any>>('saveForm');

@Component({
  selector: 'app-agency-profile',
  imports: [CommonModule,  MatTabsModule,
    MatCardModule, TranslateModule],
  templateUrl: './agency-profile.component.html',
  styleUrl: './agency-profile.component.css'
})
export class AgencyProfileComponent implements OnInit{

  constructor(private tralateService: TranslateService) {
  }

  languagePath: string = 'titles';
  agencyFormData: WritableSignal<AgencyFormWrapperDto> = signal({
    AgencyFormData: {
      AgencyId: 0,
      AgencyCode: '',
      AgencyName: '',
      AgencyAddress: '',
      AgencyContactNo: '',
      AgencyEmail: '',
      AgencyWebsite: '',
      AgencyLogoInByte: '',
      AgencyFaviconInByte: '',
      AgencyPrimaryColorCode: '#000000',
      AgencyFontColorCode: '#FFFFFF',
    } as AgencyFormDto,
    
    AgencyInvoiceSettingsData: {
      AgencyInvoiceName: '',
      AgencyInvoiceAddress: '',
      AgencyInvoiceContactNo: '',
      AgencyInvoiceEmail: '',
      AgencyInvoiceWebsite: '',
      AgencyInvoiceLogoInByte: '',
      AgencyInvoiceSlFormat: '',
    } as AgencyInvoiceSettingsFormDto
  });

  injector = Injector.create({
    providers: [
      { provide: AGENCY_FORM_DATA, useValue: this.agencyFormData },
      { provide: SAVE_FORM, useValue: this.saveForm.bind(this) }

    ]
  });

  
  selectedIndex = signal(0);

  tabs = signal<{id: number, label: string, component: any}[]>([]);
  activeTab = signal<number>(0); // 0: Agency Info, 1: Branding, 2: Invoice

  ngOnInit(): void {
    let newItems = [
      { id: 0, label: this.tralateService.instant("AgencyProfile.buttons.agencyInformation"), component: AgencyInfoComponent },
      { id: 1, label: this.tralateService.instant("AgencyProfile.buttons.brandingPreferences"), component: BrandingPreferencesComponent },
      { id: 2, label: this.tralateService.instant("AgencyProfile.buttons.invoiceInformation"), component: InvoiceInfoComponent }
    ];
    this.tabs.set([...this.tabs(), ...newItems])
  }

  setActiveTab(index: number) {
    this.activeTab.set(index);
  }

  // ✅ Save form data (Submit the whole object)
  saveForm(): void {
    console.log('Submitting Agency Data:', this.agencyFormData());
    // Call API to submit `agencyFormData()`
  }
}
