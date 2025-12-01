import { Component, inject, input, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService, PokemonDetail } from '../../services/pokemon';

@Component({
  selector: 'app-pokemon-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-detail-page.html',
  styleUrls: ['./pokemon-detail-page.css']
})
export class PokemonDetailPageComponent {
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  id = input.required<string>();

  pokemonData = signal<PokemonDetail | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  constructor() {
    effect(() => {
      this.loadPokemonDetail();
    });
  }

  private loadPokemonDetail(): void {
    const pokemonId = this.id();
    this.isLoading.set(true);
    this.error.set('');

    this.pokemonService.getPokemonDetail(pokemonId)
      .subscribe({
        next: (data) => {
          this.pokemonData.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Error al cargar el Pokémon');
          this.isLoading.set(false);
          console.error(err);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}