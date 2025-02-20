import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSearcComponentComponent } from './hero-searc-component.component';

describe('HeroSearcComponentComponent', () => {
  let component: HeroSearcComponentComponent;
  let fixture: ComponentFixture<HeroSearcComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSearcComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSearcComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
