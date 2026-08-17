import { Injectable, signal } from '@angular/core';

export interface Produto {
  nome: string;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  produtos = signal<Produto[]>([
    {
      nome: 'GTA V',
      preco: 99.90
    },
    {
      nome: 'Minecraft',
      preco: 89.90
    },
    {
      nome: 'EA Sports FC 26',
      preco: 299.90
    },
    {
      nome: 'Cyberpunk 2077',
      preco: 149.90
    }
  ]);

}