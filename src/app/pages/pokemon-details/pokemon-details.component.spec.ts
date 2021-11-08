import { RouterStub } from './../../../providers/router-stub';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { PokemonsComponent } from './../pokemons/pokemons.component';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatGridListModule, MatIconModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router,convertToParamMap,  RouterModule, ActivatedRoute } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { PokemonDetailsComponent } from './pokemon-details.component';
import { AppComponent } from 'src/app/app.component';

describe('PokemonDetailsComponent', () => {
  let component: PokemonDetailsComponent;
  let fixture: ComponentFixture<PokemonDetailsComponent>;
  let activatedRouteSpy;
  beforeEach(async(() => {
    activatedRouteSpy = {
      snapshot: {
        paramMap: convertToParamMap({
          id: 'dads123',
          code: 'IBM',
        })
      }
    };

    TestBed.configureTestingModule({
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
      providers: [
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useValue: activatedRouteSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
