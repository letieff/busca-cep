var textoCep = $('.texto-cep');
var botaoAvancar = $('.botao-avancar');
var mensagemDeErro = $('.notification');
var listaCeps = JSON.parse(localStorage.getItem('cepsSalvos'));

$(document).ready(function() {
  textoCep.mask('00000-000');
  imprimirLinhas(listaCeps);
  mesagemTabelaVazia();
});

function validarCampo() {
  /*
  Função para validar se o campo tá vazio ou não 
*/
  if (textoCep.val() === '' || textoCep.length === 0) {
    textoCep.addClass('is-danger');
    mensagemDeErro.removeClass('is-hidden');
  } else {
    textoCep.removeClass('is-danger');
    mensagemDeErro.addClass('is-hidden');
  }
}

$(botaoAvancar).click(function(e) {
  e.preventDefault();
  validarCampo();
  /*
  Função para pegar o valor do campo de texto de cep
*/
  var valorCampoCep = textoCep.val();

  $.getJSON('https://viacep.com.br/ws/' + valorCampoCep + '/json/').done(
    function(resultado) {
      var listaCeps = JSON.parse(localStorage.getItem('cepsSalvos') || '[]');
      listaCeps.push(resultado);

      localStorage.setItem('cepsSalvos', JSON.stringify(listaCeps));
      imprimirLinhas(listaCeps);
    },
  );
});

function imprimirLinhas(resultado) {
  /*
  Função para imprimirLinhas da tabela
*/
  var linhaTabela = '<tr>';

  $(resultado).each(function(index, valor) {
    linhaTabela += '<td>' + valor.cep + '</td>';
    linhaTabela += '<td>' + valor.logradouro + '</td>';
    linhaTabela += '<td>' + valor.bairro + '</td>';
    linhaTabela += '<td>' + valor.localidade + '</td>';
    linhaTabela +=
      '<td><button class="button is-danger is-outlined"><span>Remover</span><span class="icon is-small"><i class="fas fa-times"></i></span></button></td>';
    linhaTabela += '</tr>';
  });

  $('.tabela-resulta-cep')
    .empty()
    .append(linhaTabela);
}

function mesagemTabelaVazia() {
  /*
  Função para mostrar ou não mesagem de tabela vazia
*/
  if (listaCeps === null) {
    $('.notificar-sem-tabela').removeClass('is-hidden');
    $('.titulo-tabel').addClass('is-hidden');
  } else {
    $('.notificar-sem-tabela').addClass('is-hidden');
    $('.titulo-tabel').removeClass('is-hidden');
  }
}