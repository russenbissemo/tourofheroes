import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  private heroesUrl = 'api/heroes'; // URL to Web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
   }

  // Methode getHeroes pour renvoyer les héros fictifs
  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO: send the error to remote logginf infrastructure
      console.error(error);
      //TODO : better job of transforming error for user consumption
      this.log(`${operation} failed :${error.message}`);
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
  // getHero(id: number): Observable<Hero>{

  //   const hero = HEROES.find(h =>h.id === id)!;
  //   this.messageService.add(`heroService:fetched hero id=${id}`);
  //   return of(hero);
  // }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  //** PUT : Update the hero on the server */
  //   La HttpClient.put()méthode prend trois paramètres :

  // L'URL
  // Les données à mettre à jour, qui est le héros modifié dans ce cas
  // Choix

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`update hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
///** POST: add a new hero to the server */
 addHero(hero: Hero): Observable<Hero>{
  //Cette ligne envoie une requête HTTP POST au heroesUrlpoint de terminaison 
  //avec l' heroobjet comme charge utile. Elle renvoie un Observable qui émet un Heroobjet.
  return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)

  //pipe()- Cette méthode permet d'enchaîner les opérateurs 
  //RxJS à l'observable retourné par this.http.post.
  .pipe(
    // tap()- Cet opérateur vous permet d'effectuer des effets secondaires, 
    //comme la journalisation ou la modification de la valeur émise, 
    //sans changer l'observable lui-même
    tap((newHero:Hero ) => this.log(`added hero w/id id=${newHero.id}`)),
    catchError(this.handleError<Hero>('addHero'))
  )
 }
 /** Supprimer le Hero du Serveur */

deleteHero(id: number): Observable<Hero>{
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
  )
}
/* OBTENIR les héros dont le nom contient le terme de recherche */
searchHeroes(term:string): Observable<Hero[]> {
  if(!term.trim()){
    // if not search term , return empty herro array;
    //of permet de gérer le résultat d'une recherche vide
    return of([])
  }
  return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(x=> x.length ?
      this.log(`found heroes matching "${term}"`) :

      this.log(`no heroes matching "${term}`)),
      catchError(this.handleError<Hero[]>('searchEroes',[]))
  )
}
}
