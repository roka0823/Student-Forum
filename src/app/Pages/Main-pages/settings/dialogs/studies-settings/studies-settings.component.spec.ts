import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiesSettingsComponent } from './studies-settings.component';

describe('StudiesSettingsComponent', () => {
  let component: StudiesSettingsComponent;
  let fixture: ComponentFixture<StudiesSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudiesSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudiesSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
