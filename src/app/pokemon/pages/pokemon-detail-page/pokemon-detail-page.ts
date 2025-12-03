import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
  private route = inject(ActivatedRoute);

  pokemonData = signal<PokemonDetail | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  constructor() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPokemonDetail(id);
      }
    });
  }

  private loadPokemonDetail(pokemonId: string): void {
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
