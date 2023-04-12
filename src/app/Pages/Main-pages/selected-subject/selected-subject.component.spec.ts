import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedSubjectComponent } from './selected-subject.component';

describe('SelectedSubjectComponent', () => {
  let component: SelectedSubjectComponent;
  let fixture: ComponentFixture<SelectedSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
