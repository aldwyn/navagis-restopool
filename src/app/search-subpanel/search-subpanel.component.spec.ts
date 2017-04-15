import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSubpanelComponent } from './search-subpanel.component';

describe('SearchSubpanelComponent', () => {
  let component: SearchSubpanelComponent;
  let fixture: ComponentFixture<SearchSubpanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchSubpanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSubpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
