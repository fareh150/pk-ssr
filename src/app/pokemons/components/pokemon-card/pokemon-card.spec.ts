import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
}

describe('PokemonCardComponent', () => {

  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    // se pone primero el nombre del input en el componente y luego el valor creado (mock)
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    console.log(compiled);

    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue',() =>
  {
    expect(component.pokemon()).toEqual(mockPokemon);
  })

  it('should render the pokemon name and image correctly', () =>
  {
    const pokemonImage = compiled.querySelector('img') as HTMLImageElement;
    const pokemonName = compiled.querySelector('h2') as HTMLHeadElement;

    expect(pokemonImage.src).toContain(mockPokemon.id);
    // correct way to test the image src
    //expect(pokemonImage.src).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${mockPokemon.id}.png`)
    expect(pokemonName.textContent).toBe(mockPokemon.name);
  })

  it('should have the proper ng-reflect-router-link', () =>
  {
    const divWithLink = compiled.querySelector('div') as HTMLDivElement;

    expect(divWithLink.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons,${mockPokemon.name}`);

  })
});
