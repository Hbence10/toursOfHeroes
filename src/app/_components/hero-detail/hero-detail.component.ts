import { Component, inject, input, Input, OnInit } from '@angular/core';
import { Hero } from '../../_models/hero';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../../_services/hero.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css',
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  route = inject(ActivatedRoute);
  heroSErvice = inject(HeroService);
  location = inject(Location);

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    const id = Number(this.route.snapshot.paramMap.get(`id`));
    this.heroSErvice.getHero(id).subscribe({
      next: (response) => (this.hero = response),
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero){
      this.heroSErvice.updateHero(this.hero).subscribe({
        next : response => this.goBack()
      })
    }
  }
}
