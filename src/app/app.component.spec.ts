import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';

let fixture: ComponentFixture<AppComponent>;
let app: AppComponent;
let compiled: HTMLDivElement;

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

   it(`should render the navbar and router-outlet`, () => {
     expect(compiled.querySelector('app-navbar')).toBeTruthy();
     expect(compiled.querySelector('router-outlet')).toBeTruthy();
   });

  // it('should render title', () => {
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, pokemon-ssr');
  // });
});
