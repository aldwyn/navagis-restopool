import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSubpanelComponent } from './details-subpanel.component';

describe('DetailsSubpanelComponent', () => {
  let component: DetailsSubpanelComponent;
  let fixture: ComponentFixture<DetailsSubpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsSubpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSubpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
