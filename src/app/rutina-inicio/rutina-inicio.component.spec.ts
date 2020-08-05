import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutinaInicioComponent } from './rutina-inicio.component';

describe('RutinaInicioComponent', () => {
  let component: RutinaInicioComponent;
  let fixture: ComponentFixture<RutinaInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutinaInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutinaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
