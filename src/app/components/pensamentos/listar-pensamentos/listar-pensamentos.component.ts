import { Router } from '@angular/router';
import { PensamentoService } from './../pensamento.service';
import { Pensamento } from '../pensamento';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css'],
})
export class ListarPensamentosComponent implements OnInit {
  listarPensamentos: Pensamento[] = [];
  paginaAtual: number = 1
  haMaisPensamentos: boolean = true
  filtro: string = ''
  favoritos: boolean = false
  listaFavoritos: Pensamento[] = []
  titulo: string = 'Meu mural'

  constructor(
    private service: PensamentoService,
    private router: Router) {}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listarPensamentos) => {
      this.listarPensamentos = listarPensamentos
    })
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listarPensamentos => {
      this.listarPensamentos.push(...listarPensamentos)
      if(!this.listarPensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listarPensamentos => {
        this.listarPensamentos = listarPensamentos
      })
  }

  recarregarComponente() {
    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

  listarFavoritos() {
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentosFavoritos => {
        this.listarPensamentos = listaPensamentosFavoritos
        this.listaFavoritos = listaPensamentosFavoritos
      })
  }
}
