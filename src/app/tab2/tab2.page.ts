import { Component } from '@angular/core';

// Importação do MathJs para executar ações //
import { evaluate } from 'mathjs';

// Importação do Alert do Ionic //
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {
  public calculo = '';
  public resultado: string;

  // Variável do tipo Boolean para "controlar"  o uso do ponto//
  private ponto = false;

  // Array de operações possiveis //
  private operacoes = ['+', '-', '*', '/'];

  // Criando variável para receber as funções da importação //
  constructor(public alertController: AlertController) { }


  // Função para adicionar um número //
  public adicionarNumero(valor: string) {

    // Condição -> Se houver resultado e o usúario insira um novo número  ele limpa a tela //
    if (this.resultado) {
      this.apagarTudo();
    }

    // Soma ao calculo o valor(número) selecionado //
    this.calculo = this.calculo + valor;
  }


  // Função para adicionar ponto //
  public adicionarPonto() {
    // Se houver um ponto "existente", mata a execução do método com o return;//
    if (this.ponto) {
      return;

    }
    //Adiciona o ponto no calculo //
    this.calculo += ".";
    // Evita que se insira mais um ponto //
    this.ponto = true;
  }


  // Função para adicionar um operador //
  public adicionarOperacao(operador: string) {

    // Se o usúario for adicionar um operador ao resultado existente//
    if (this.resultado) {
      // Transforma o resultado em String, para continuar o calculo //
      this.calculo = this.resultado.toString();
      // Torna o resultado anterior um valor para o calculo e anula o ultimo //
      this.resultado = null;
    }
      
      // Verifica o ultimo caracter selecionado //
    const ultimo = this.calculo.slice(-1);
      // O indexOf verifica por parâmetro o ultimo caracter digitado  INDEX INICIAL = 0// 
    if (this.operacoes.indexOf(ultimo) > -1) {
      // Mata a execução para evitar que insira mais de um operador seguido //
      return;

    }
 
      // Soma ao calculo o operador //
    this.calculo += operador;

    // Torna possivel adicionar um ponto se o usúario selecionou um novo operador //
    this.ponto = false;
  }


  // Função para limpar os dados da tela //
  public apagarTudo() {
    this.calculo = ''; // Torna a variável VAZIA //
    this.resultado = null; // Torna a variável NULA //
    this.ponto = false; // Faz com que possa se inserir um novo ponto após a exclusão //
  }


  // Função para apagar o ultimo caracter digitado //
  public apagarUltimo() {
      // Criando variável para ver o ultimo caracter //
    const ultimo = this.calculo.slice(-1);

      // Teste para verificar se  último caracter é  um PONTO //
    if (ultimo == '.') {
       // Torna possivel adicionar um novo ponto //
      this.ponto = false;
    }

    /* SLICE(Inicio[parte para cortar], Final[Parte que inicia o corte, não incluida no corte]) 
       -1 = Último

       SUBSTRING(Semelhante ao SLICE) Diferença: --Se o inicio for maior que o final, INVERTE A POSIÇÃO
                                                 --Se um dos valores for negativo ou NaN, ele substitui por zero
    */
    this.calculo = this.calculo.slice(0, -1);

  }


  // Função que pega o que foi digitado no campo calculo aplica o mathjs e retorna o resultado //
  public calcularResultado() {
    // Se ocorrer de maneira correta executa as ações //
    try {
      this.resultado = evaluate(this.calculo);

      // Se ocorrer erro mostra a mensagem de erro //
    } catch (e) {
      // Deixa o resultado vazio //
      this.resultado = '';

      // Emite a seguinte mensagem ao usuário //
      this.presentAlert('Erro!', 'Cálculo inválido, tente novamente e verifique se está correto!');
    }
  }


  // Função para exibir a mensagem de erro ao usuário //
  async presentAlert(titulo: string, msg: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
