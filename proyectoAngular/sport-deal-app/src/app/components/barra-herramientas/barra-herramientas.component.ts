import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.scss']
})
export class BarraHerramientasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  menuInicio(){
    this.router.navigate(["/pantallaPrincipal"]);
  }

}
