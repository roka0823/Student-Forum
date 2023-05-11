import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassageDialogComponent } from './massage-dialog.component';

describe('MassageDialogComponent', () => {
  let component: MassageDialogComponent;
  let fixture: ComponentFixture<MassageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MassageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
