import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  private title = inject(Title)
  private meta = inject(Meta)

  ngOnInit(): void {
    this.title.setTitle('Pricing Page')
    this.meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page' })
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' })
    this.meta.updateTag({ name: 'keywords', content: 'Fareh,Romero,primer,ssr,angular,PRO,Curso' })
  }
}
