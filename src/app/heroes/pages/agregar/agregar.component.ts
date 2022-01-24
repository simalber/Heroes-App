import { Component, OnInit } from '@angular/core';
import { Publisher, Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../service/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width : 100%;
    border-radius : 5px;
  }`
  ]
})
export class AgregarComponent implements OnInit {

   publishers = [
     {
       id : 'DC Comics',
       desc: 'DC - Comics'
     },
     {
      id : 'Marvel Comics',
      desc: 'Marvel - Comics'
     }
   ];

   Heroe: Heroe = {
     superhero : '',
     alter_ego : '',
     first_appearance : '',
     publisher : Publisher.DCComics,
     alt_img : '',
     characters: '',

   }

  constructor( private HeroesService: HeroesService,
               private ActivatedRoute: ActivatedRoute,
               private Router: Router,
               private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.Router.url.includes('editar')) {
      return;
    }


    this.ActivatedRoute.params
    .pipe(switchMap( ({id}) => this.HeroesService.getHeroePorId(id))
    )
    .subscribe( heroe => this.Heroe = heroe);
  }

  guardar()  {
    if (this.Heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.Heroe.id) {
      //actualizar
      this.HeroesService.actualizarHeroe(this.Heroe)
      .subscribe( heroe => this.mostrarSnackbar('Registro actualizado'))
    } else {

          this.HeroesService.agregarHeroe( this.Heroe )
          .subscribe( heroe => {
          this.Router.navigate(['/heroes/editar', heroe.id]);
          })

      //crear
    }
  }


  mostrarSnackbar( mensaje:string ){
    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });
  }



}
