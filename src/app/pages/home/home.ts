import { Component } from '@angular/core';
import { Header } from '../../layouts/header/header';
import { About } from '../sections/about/about';
import { Hero } from '../sections/hero/hero';
import { Team } from '../sections/team/team';
import { Quote } from '../sections/quote/quote';
import { Services } from '../sections/services/services';
import { ActionBox } from '../sections/action-box/action-box';
import { Work } from '../sections/work/work';
import { Client } from '../sections/client/client';
import { Milestone } from '../sections/milestone/milestone';
import { Pricing } from '../sections/pricing/pricing';
import { Contact } from '../sections/contact/contact';
import { ThemePanel } from '../sections/theme-panel/theme-panel';

@Component({
  selector: 'app-home',
  imports: [Header, About, Hero, Team, Quote, Services, ActionBox, Work, Client, Milestone, Pricing, Contact, ThemePanel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  title1 = 'Welcome to Color Admin';
  title2 = 'Multipurpose One Page Theme';
  description = "We have created a multi-purpose theme that take the form of One-Page or Multi-Page Version. \nUse our theme panel to select your favorite theme color.";
  cta1 = 'Explore More'
  cta2 = 'Purchase Now';
  lien = "subscribe";
  image = "../assets/img/bg/bg-home.jpg";
}
