import { PokemonDetailsComponent } from './../pokemon-details/pokemon-details.component';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatInputModule, MatIconModule, MatGridListModule, MatProgressBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { PokemonsComponent } from './pokemons.component';

describe('PokemonsComponent', () => {
  let component: PokemonsComponent;
  let fixture: ComponentFixture<PokemonsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatInputModule,
        MatIconModule,
        HttpClientModule,
        RouterModule,
        MatProgressBarModule,
        FormsModule,
        InfiniteScrollModule
      ],
      declarations: [
        PokemonsComponent,
        PokemonDetailsComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve retornar a cor de background dos tipos de pokemon', () => {
    expect(component.getBackgroundColor('poison')).toEqual('#b97fc9');
    expect(component.getBackgroundColor('water')).toEqual('#4592c4');
    expect(component.getBackgroundColor('')).toEqual('#a4acaf');
  });





});
