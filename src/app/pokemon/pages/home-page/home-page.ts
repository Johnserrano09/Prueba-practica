import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PokemonService, PokemonBasic, PokemonListResponse } from '../../services/pokemon';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePageComponent {
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  currentOffset = signal<number>(20);
  limit = signal<number>(20);
  currentPage = computed(() => Math.floor(this.currentOffset() / this.limit()) + 1);

  pokemonData = signal<PokemonListResponse | null>(null);
  isLoading = signal<boolean>(false);
  error = signal<string>('');

  constructor() {
    effect(() => {
      this.loadPokemonList();
    });
  }

  private loadPokemonList(): void {
    this.isLoading.set(true);
    this.error.set('');

    this.pokemonService.getPokemonList(this.currentOffset(), this.limit())
      .subscribe({
        next: (data) => {
          this.pokemonData.set(data);
          this.isLoading.set(false);
        },
        error: (err) => {
          this.error.set('Error al cargar los Pokémon');
          this.isLoading.set(false);
          console.error(err);
        }
      });
  }

  extractPokemonId(url: string): string {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  }

  viewPokemonDetail(pokemon: PokemonBasic): void {
    const id = this.extractPokemonId(pokemon.url);
    this.router.navigate(['/pokemon', id]);
  }

  canGoPrevious(): boolean {
    return this.currentOffset() > 0;
  }

  canGoNext(): boolean {
    return !!this.pokemonData()?.next;
  }

  previousPage(): void {
    if (this.canGoPrevious()) {
      this.currentOffset.update(offset => Math.max(0, offset - this.limit()));
    }
  }

  nextPage(): void {
    if (this.canGoNext()) {
      this.currentOffset.update(offset => offset + this.limit());
    }
  }
}