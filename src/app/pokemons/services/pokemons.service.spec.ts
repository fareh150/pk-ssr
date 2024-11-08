import { TestBed } from "@angular/core/testing";
import { PokemonsService } from "./pokemons.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { PokeAPIResponse, SimplePokemon } from "../interfaces";

const mockPokeApiResponse: PokeAPIResponse = {

    "count": 1302,
    "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
    "previous": null,
    "results": [
        {
            "name": "bulbasaur",
            "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
            "name": "ivysaur",
            "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
    ]

}

const expectedPokemons: SimplePokemon[] = [
  {
    id: '1',
    name: 'bulbasaur',
  },
  {
    id: '2',
    name: 'ivysaur',
  },
];

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
}

describe('PokemonsService', () =>
{
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  // despues de cada prueba http hay que verificar  y con afterEach no repetimos tanto codigo
  afterEach(() =>
  {
    httpMock.verify();
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });

  it('should load a page of a SimplePokemon',() =>
  {
    // subcribe to wait
    service.loadPage(1).subscribe(pokemons =>
    {
      expect(pokemons).toEqual(expectedPokemons);
    })
    //create request to expected response
    const req = httpMock
      .expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`)

    expect(req.request.method).toBe('GET');
    // use false data
    req.flush(mockPokeApiResponse)
  })
});
