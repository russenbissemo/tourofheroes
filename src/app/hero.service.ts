import { Injectable } from '@angular/core';
import {Hero} from '../models/hero.model';
import {HEROES} from './mock-heroes';
import { Observable , of } from 'rxjs';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }
// Methode getHeroes pour renvoyer les héros fictifs 
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
  
}
