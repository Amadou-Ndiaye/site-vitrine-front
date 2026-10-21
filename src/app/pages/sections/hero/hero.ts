import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {

  title1 = input<string>();
  title2 = input<string>();
  description = input<string>();
  cta1 = input<string>();
  cta2 = input<string>();
  lien = input<string>();
  image = input<string>();
}
