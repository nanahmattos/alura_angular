import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listarPensamentos = [
  {
    conteudo: 'Aprendendo Angular',
    autoria: 'Dev',
    modelo: 'modelo2'
  },
  {
    conteudo: 'Aprendendo Angular',
    autoria: 'Dev',
    modelo: 'modelo3'
  }
]
  constructor() { }

  ngOnInit(): void {
  }

}
