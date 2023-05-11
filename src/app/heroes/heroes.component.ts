import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/models/hero.model';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  selectedHero?: Hero;

  constructor(private heroService: HeroService) {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  //methode pour récupérer les héros du service
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }
  // Angular appelle ngOnInit() à un moment approprié après la construction de HeroesComponent instance
  ngOnInit(): void {
    this.getHeroes();
  }
}
