import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaFinComponent } from './rutina-fin.component';

describe('RutinaFinComponent', () => {
  let component: RutinaFinComponent;
  let fixture: ComponentFixture<RutinaFinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaFinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
