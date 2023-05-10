import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostPopupDialogComponent } from './new-post-popup-dialog.component';

describe('NewPostPopupDialogComponent', () => {
  let component: NewPostPopupDialogComponent;
  let fixture: ComponentFixture<NewPostPopupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostPopupDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPostPopupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
