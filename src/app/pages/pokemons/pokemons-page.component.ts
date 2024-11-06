import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

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

  private route = inject(ActivatedRoute);

  public currentPage = toSignal(
    //to signal pilla un observable y lo convierte en un signal
    this.route.queryParamMap.pipe(
      map(params => params.get('page') || '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page))
    )
  )

  ngOnInit(): void {
    console.log(this.currentPage());

    this.loadPokemon()
  }

  public loadPokemon( page = 0 )
  {
    const pageToLoad = this.currentPage()! + page;
    this.pokemonsService.loadPage(pageToLoad)
      .subscribe( pokemons =>
      {
        this.pokemons.set(pokemons)
      })
  }
}
