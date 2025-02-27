import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Hero } from '../../_models/hero';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { HeroService } from '../../_services/hero.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-search',
  imports: [RouterModule, CommonModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit{
  heroService = inject(HeroService)
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),                                                          // wait 300ms after each keystroke before considering the term
      distinctUntilChanged(),                                                     // ignore new term if same as previous term
      switchMap((term: string) => this.heroService.searchHeroes(term)),           // switch to new search observable each time the term changes
    )
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
