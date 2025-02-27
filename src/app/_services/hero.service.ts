// import { HEROES } from './../_models/mock-heroes';
import { inject, Injectable } from '@angular/core';
import { Hero } from '../_models/hero';
import { HEROES } from '../_models/mock-heroes';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  messageService = inject(MessageService);
  private http = inject(HttpClient);
  private heroesURL: string = `api/heroes`;

  constructor() {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesURL).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>(`getHeroes`, []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesURL, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesURL, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }


  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    return of([]);
  }

  return this.http.get<Hero[]>(`${this.heroesURL}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found heroes matching "${term}"`) :
       this.log(`no heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  );
}
}
