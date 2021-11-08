import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonsService } from 'src/app/services/pokemon/pokemons.service';

import { Pokemon } from './../../../model/pokemon';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: Pokemon;
  inscription: Subscription;
  flavorText: string =  null;
  genders = [
    {id: 1, gender: 'female'},
    {id: 2, gender: 'male'},
    {id: 3, gender: 'genderless'},
  ];
  types: Array<any> = [];
  weaknesses: Array<any> = [];
  pokemonToEvolution: Array<any> = [];
  nextPokemon: number = 1;
  constructor(private _router: Router, private _activatedRoute: ActivatedRoute,
    private _pokemon: PokemonsService, private _utils: UtilsService) {
    if (this._router.getCurrentNavigation().extras.state) {
      this.pokemon = this._router.getCurrentNavigation().extras.state.pokemon;
      this.getMoreInfosPokemon();
    } else {
      console.log(this._activatedRoute.snapshot.paramMap)
      let name = this._activatedRoute.snapshot.paramMap.get('name');
      console.log(name);
      this.getPokemonByName(name);
    }
   }

  ngOnInit(): void {

  }

  getPokemonByName(name) {
    this._pokemon.getPokemon(name).subscribe((response: Pokemon) => {
      this.pokemon = response;
      this.getMoreInfosPokemon();
    });
  }

  getMoreInfosPokemon() {
    this.getPokemonSpecies();
    this.getGender();
    this.getTypes();
    this.getEvolution();
    this.nextPokemon = (this.pokemon.id + 1) > 1118 ? 1 : (this.pokemon.id + 1);
  }

  getPokemonSpecies() {
    this._pokemon.getPokemonSpecies(this.pokemon.id).subscribe((response) => {
      this.pokemon.description = response;
    });
  }

  getGender() {
    this.pokemon.gender = new Array();
    for (let index = 1; index <= this.genders.length; index++) {
      this._pokemon.getGender(index).subscribe((response:any) => {
        let isSameGender = null;
        if (response.pokemon_species_details) {
          isSameGender = response.pokemon_species_details.filter(
            current => current.pokemon_species.name === this.pokemon.name);
            if (isSameGender.length > 0) {
              this.pokemon.gender.push(this.genders[index - 1]);
            }
        }
      });
    }
  }

  getTypes() {
    this.pokemon.types.forEach(type => {
      this._pokemon.getType(type.type.name).subscribe((response) => {
        this.types.push(response);
      }).add(() => {
        this.setWeaknesses();
      });
    });

  }

  setWeaknesses() {
    this.types.forEach( element => {
      element.damage_relations.double_damage_from.forEach(type => {
        let haveType = this.findTypeWeaknesses(type);
        if (!haveType) {
          this.weaknesses.push(type);
        }
      });
    });
  }

  findTypeWeaknesses(type) {
    return this.weaknesses.find(element => element.name === type.name);
  }

  getEvolution() {
    this._pokemon.getEvolution(this.pokemon.id).subscribe((response: any) => {
      response.chain.evolves_to.forEach(element => {
        console.log(element)
        this.getEvolutionPokemon(element.species.name);
      });

    });
  }

  getEvolutionPokemon(name) {
    this._pokemon.getPokemon(name).subscribe((response: Pokemon) => {
      this.pokemonToEvolution.push(response);
    });
  }

  goToPokemon(pokemon: Pokemon) {
    this._router.navigate(['pokemon-details/', pokemon.name], { state: { pokemon: pokemon } });
  }

  goToNextPokemon() {
    this.getPokemonByName(this.nextPokemon);
  }

  changeFlavorText(flavor) {
    this.flavorText = flavor.flavor_text;
  }

  getVersionIsEnAndOnlyCrystalAndFirered() {
    if (this.pokemon['description']) {
      let flavors = this.pokemon['description']['flavor_text_entries'].filter(current => {
        return current.language.name === 'en' && (current.version.name === 'firered' || current.version.name === 'crystal')
      });
      if (!this.flavorText) {
        this.changeFlavorText(flavors[0]);
      }

      return flavors;
    }
  }

  getImg(pokemon) {
    return pokemon.sprites['other']['official-artwork'].front_default;
  }

  getBackgroundColor(type) {
    return this._utils.getBackgroundColor(type)
  }
}
