import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { LoginPageComponent } from './auth/login-page/login-page';
import { HomePageComponent } from './pokemon/pages/home-page/home-page';
import { PokemonDetailPageComponent } from './pokemon/pages/pokemon-detail-page/pokemon-detail-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailPageComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];