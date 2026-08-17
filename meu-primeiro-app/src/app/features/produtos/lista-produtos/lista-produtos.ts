import {
  Component,
  signal,
  computed,
  effect,
  inject
} from '@angular/core';

import { ProdutosService } from '../../../core/services/produtos.service';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoService } from '../../../core/services/carrinho.service';

@Component({
  selector: 'app-lista-produtos',
  imports: [MatButtonModule],
  templateUrl: './lista-produtos.html',
  styleUrl: './lista-produtos.css',
})
export class ListaProdutos {

  // =========================
  // PRODUTOS
  // =========================

  private produtosService = inject(ProdutosService);

  produtos = this.produtosService.produtos;


  // =========================
  // CARRINHO
  // =========================

  carrinhoService = inject(CarrinhoService);

  carrinho = this.carrinhoService.itens;

  quantidadeCarrinho = this.carrinhoService.quantidade;

  totalCarrinho = this.carrinhoService.total;


  // =========================
  // ESTADOS
  // =========================

  produtoSelecionado = signal<string | null>(null);

  erro = signal<string | null>(null);

  carregando = signal(false);


  // =========================
  // COMPUTEDS
  // =========================

  totalProdutos = computed(() => {
    return this.produtos().length;
  });

  valorTotal = computed(() => {
    return this.produtos().reduce(
      (total, item) => total + item.preco,
      0
    );
  });


  // =========================
  // CONSTRUCTOR
  // =========================

  constructor() {

    effect(() => {
      console.log(
        'Produto selecionado:',
        this.produtoSelecionado()
      );
    });

    effect(() => {
      console.log(
        'Valor total atualizado:',
        this.valorTotal()
      );
    });

    effect(() => {
      if (typeof document !== 'undefined') {
        document.title =
          `(${this.totalProdutos()}) Minha Loja`;
      }
    });

  }


  // =========================
  // SELECIONAR PRODUTO
  // =========================

  exibirProduto(nome: string) {
    this.produtoSelecionado.set(nome);
  }


  // =========================
  // ADICIONAR PRODUTO
  // =========================

  adicionarProduto() {

    this.produtosService.produtos.update(listaAtual => [
      ...listaAtual,
      {
        nome: 'Novo jogo',
        preco: 199.90
      }
    ]);

  }


  // =========================
  // SUBSTITUIR PRODUTOS
  // =========================

  substituirProdutos() {

    this.produtosService.produtos.set([
      {
        nome: 'Produto novo',
        preco: 999
      }
    ]);

  }


  // =========================
  // ADICIONAR AO CARRINHO
  // =========================

  adicionarAoCarrinho(
    produto: { nome: string; preco: number }
  ) {

    this.carrinhoService.adicionar(produto);

  }

}