import { AppConfig } from './../../../config/app.config';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { PokemonsService } from 'src/app/services/pokemon/pokemons.service';
import { IPokemonsList } from 'src/interfaces/IPokemonsList';
import { Pokemon } from 'src/model/pokemon';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit {

  title = 'Pokedex';
  pokemons: Array<IPokemonsList>;
  allPokemons: Array<IPokemonsList>;
  offset = 0;
  limit = 20;
  search: string = '';
  constructor(private _router:Router, private _pokemon: PokemonsService,
    private _utils: UtilsService) {
    this.pokemons = new Array<IPokemonsList>();
    this.allPokemons = new Array<IPokemonsList>();
  }

  ngOnInit(): void {
    this.getPokemons();
   // this.getAllPokemons();
  }

  getMorePokemons() {
    this.offset += 20;
    this.getPokemons();
  }

  getPokemons(name?) {
    let pokemons;
    this._pokemon.getPokemons(this.offset, this.limit, name).subscribe((response: any) => {
      if (response['results']) {
        pokemons = response['results'];
      } else {
        this.pokemons = [];
        pokemons = [
          {
            name: response.name,
            url: AppConfig.ENDPOINT + 'pokemon/' + response['id']
          }
        ]
      }
    }, (error) => {
      console.log(error)
    }).add((response) => {
       this.setPokemonsList(pokemons);
    })
  }

  setPokemonsList(pokemons) {
    pokemons.forEach((pokemonList, index ) => {
      this.getPokemonByUrl(pokemonList.url).subscribe((pokemon) => {
        let iPokemonsList = {
          name: pokemonList.name,
          url: pokemonList.url,
          pokemon: pokemon
        }
        this.pushPokemonList(iPokemonsList);
        //console.log(index, pokemons.length -1)
        if (index == pokemons.length -1 ) {
          this.orderById();
        }
      });

    });
  }

  getPokemonByUrl(url): Observable<IPokemonsList> {
    var subject = new Subject<any>();
    let pokemon: Pokemon;
    this._pokemon.getUrl(url).subscribe((pokemonInformation:Pokemon) => {
      pokemon = pokemonInformation;
      subject.next(pokemon);
    });
    return subject.asObservable();
  }

  pushPokemonList(pokemon) {
    console.log(pokemon);

    this.pokemons.push(pokemon);
  }

  orderById() {
    this.pokemons.sort((a, b) => (a.pokemon.id - b.pokemon.id));
  }

  goToPokemon(pokemon: Pokemon) {
    this._router.navigate(['pokemon-details/', pokemon.name], { state: { pokemon: pokemon } });
  }

  getByIdOrName() {
    this.getPokemons(this.search);
   /*  this.pokemons = this.allPokemons.filter(current => {
      return (current.pokemon.id + '').includes(this.search) || current.name.includes(this.search);
    }); */
  }

  getImg(pokemon) {
    return pokemon.pokemon.sprites.other['official-artwork'].front_default;
  }

  /**
   * crido somente para filtrar, devido a nao encontrar busca por string em toda a base
   * nao usado
   */
  getAllPokemons() {
    let pokemons;
    this._pokemon.getPokemons(0, 1118).subscribe((response: IPokemonsList) => {
      if (response['results']) {
        pokemons = response['results'];
      }

    }, (error) => {
      console.log(error)
    }).add((response) => {
      pokemons.forEach(pokemonList => {
        // console.log(pokemonList)
        this.getPokemonByUrl(pokemonList.url).subscribe((pokemon) => {
          let iPokemonsList = {
            name: pokemonList.name,
            url: pokemonList.url,
            pokemon: pokemon
          }
          this.pushAllPokemonList(iPokemonsList);
        });
      });
    })
  }

  pushAllPokemonList(pokemon) {
    this.allPokemons.push(pokemon);
  }

  getBackgroundColor(type) {
    return this._utils.getBackgroundColor(type)
  }
}
