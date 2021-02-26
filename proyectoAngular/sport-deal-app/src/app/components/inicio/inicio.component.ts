import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
    
  }

  listadoDeportes(modalidad : string){
    switch (modalidad){
      case "futbol" : this.router.navigate(["/listadoInstalaciones/1"]);
      case "baloncesto" : this.router.navigate(["/listadoInstalaciones/3"]);
      case "tenis" : this.router.navigate(["/listadoInstalaciones/2"]);
      case "motor" : this.router.navigate(["/listadoInstalaciones/4"]);
    }
    
  }
}
