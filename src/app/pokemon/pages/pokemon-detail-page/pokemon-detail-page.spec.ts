import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailPageComponent } from './pokemon-detail-page';

describe('PokemonDetailPage', () => {
  let component: PokemonDetailPageComponent;
  let fixture: ComponentFixture<PokemonDetailPageComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
