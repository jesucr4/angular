import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDataType, DialogTypes } from './dialog-data-type';

@Component({
  selector: 'app-cuadro-dialogo',
  templateUrl: './cuadro-dialogo.component.html',
  styleUrls: ['./cuadro-dialogo.component.scss']
})
export class CuadroDialogoComponent {

  public dialogTypesClass = DialogTypes;

  // La variable "data" será accesible desde el template (html) de este componente
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataType) { }

}
