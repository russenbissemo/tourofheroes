import { Injectable } from '@angular/core';
import {Hero} from '../models/hero.model';
import {HEROES} from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }
// Methode getHeroes pour renvoyer els héros fictifs 
  getHeroes(): Hero[] {
    return HEROES;
  }
  
}
