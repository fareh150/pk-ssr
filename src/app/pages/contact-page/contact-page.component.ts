import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent { }
