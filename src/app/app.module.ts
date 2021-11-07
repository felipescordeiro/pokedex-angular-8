import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule, MatIconModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';
import { PokemonsComponent } from './pages/pokemons/pokemons.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonDetailsComponent,
    PokemonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
    MatGridListModule,
    MatProgressBarModule,
    FormsModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
