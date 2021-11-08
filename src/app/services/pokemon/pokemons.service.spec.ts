import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokemonsService } from './pokemons.service';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpController: HttpTestingController;
  var originalTimeout;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokemonsService],
      imports: [HttpClientTestingModule]
    })
    service = TestBed.get(PokemonsService);
    httpController = TestBed.get(HttpTestingController);

  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

 /*  it('recupera 2 pokemons',
  (done: DoneFn) => {
    service.getPokemons(0, 2).subscribe((value) => {
      console.log(value['results'].length)
      expect(value['results'].length).toEqual(2);
      done();
    });
  }); */
});
