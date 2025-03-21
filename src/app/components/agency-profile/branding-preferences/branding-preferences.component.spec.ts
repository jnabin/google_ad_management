import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandingPreferencesComponent } from './branding-preferences.component';

describe('BrandingPreferencesComponent', () => {
  let component: BrandingPreferencesComponent;
  let fixture: ComponentFixture<BrandingPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandingPreferencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandingPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
