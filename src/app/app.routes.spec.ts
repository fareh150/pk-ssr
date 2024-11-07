import { TestBed } from "@angular/core/testing";
import { routes } from "./app.routes";
import { provideRouter, Router } from "@angular/router";
import { Location } from "@angular/common";

describe('App Routes', () =>
{
  let router: Router;
  let location: Location;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers:[
          provideRouter(routes)
      ]
    })

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  })

  it('should navigate to "about" redirects to "/about" ', async() =>
  {
    await router.navigate(['about']);

    expect(location.path()).toBe('/about');
  })

  it('should navigate to "pokemon/page/1" redirects to "/pokemon/page/1" ', async() =>
  {
    await router.navigate(['pokemons/pages/1']);

    expect(location.path()).toBe('/pokemons/pages/1');
  })

  it('should navigate to "unknown-page" redirects to "about" ', async() =>
  {
    await router.navigate(['unknown-page']);
    // console.log(location.path());

    expect(location.path()).toBe('/about');
  })

  it('should load the proper component', async() =>
  {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();

    const aboutComponent = (await aboutRoute.loadComponent!()) as any;
    // to get name of unknown component
    expect(aboutComponent.default.name).toBe('AboutPageComponent');

    const pokemonPageRoute = routes.find((route) => route.path === 'pokemons/pages/:page')!;
    expect(pokemonPageRoute).toBeDefined();

    const pokemonPage = (await pokemonPageRoute.loadComponent!()) as any;
    // to get name of unknown component
    expect(pokemonPage.default.name).toBe('PokemonsPageComponent');
  })
})
