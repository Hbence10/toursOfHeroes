import { RouterModule } from '@angular/router';
import { Hero } from '../../_models/hero';
import { HeroService } from './../../_services/hero.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  heroes : Hero[] = []
  heroService = inject(HeroService)

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe({
        next: response =>  this.heroes =  response.slice(1, 5)
      });
  }
}

