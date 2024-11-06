import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [
    PokemonListComponent,
    PokemonListSkeletonComponent
  ],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {

  private pokemonsService = inject(PokemonsService)
  public pokemons = signal<SimplePokemon[]>([])

  ngOnInit(): void {
    this.loadPokemon()
  }

  public loadPokemon( page = 0 )
  {
    this.pokemonsService.loadPage(page)
      .subscribe( pokemons =>
      {
        this.pokemons.set(pokemons)
      })
  }
}
