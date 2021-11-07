import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonsComponent } from './pages/pokemons/pokemons.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';


const routes: Routes = [
  { path: '', component: PokemonsComponent},
  { path: 'pokemons', component: PokemonsComponent},
  { path: 'pokemon-details', component: PokemonDetailsComponent },
  { path: 'pokemon-details/:name', component: PokemonDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
