import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
    public calculo = '';
    public resultado: string;

  constructor() {}
    
    public adicionarNumero(valor:string){
      this.calculo = this.calculo + valor;
    }

    public adicionarPonto(){
      // Mesma forma, só que resumida //
      this.calculo += ".";
    }

    public adicionarOperacao(operador: string){
     this.calculo += operador;
    }

    public apagarTudo(){
      this.calculo = '';
      this.resultado = null;
    }

    public apagarUltimo(){
      this.calculo = this.calculo.substring(0,(this.calculo.length -1));
    }
}
