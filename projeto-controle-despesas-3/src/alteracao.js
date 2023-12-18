import { carregarDespesas, obterIndiceSelecionado, salvarDespesas } from "./storage.js";

document.addEventListener('DOMContentLoaded', aoCarregar);

function aoCarregar(){
    const indiceSelecionado = obterIndiceSelecionado();
    console.log(indiceSelecionado);
    if (indiceSelecionado < 0 ){
        alert('Por favor, clique em Alterar na listagem');
        location.href = 'listagem.html';
        return;
    }
    const despesas = carregarDespesas();
    const despesa = despesas[indiceSelecionado];
    desenharDespesa(despesa);
    console.log(despesa)

    document.getElementById('salvar').addEventListener('click', aoSalvar);
}

function desenharDespesa(despesa){
    document.getElementById('dia').value = despesa.dia;
    document.getElementById('descricao').value = despesa.descricao;
    document.getElementById('valor').value = despesa.valor;
    document.getElementById('situacao').value = despesa.situacao;
    document.getElementById('dataPagamento').value = despesa.dataPagamento;
    document.getElementById('valorPagamento').value = despesa.valorPagamento;
}

function aoSalvar(event){
    event.preventDefault();
    const despesa = {
        dia : document.getElementById('dia').value,
        descricao: document.getElementById( 'descricao' ).value,
        valor: document.getElementById('valor').value,
        situacao: document.getElementById('situacao').value,
        dataPagamento: document.getElementById('dataPagamento').value,
        valorPagamento: document.getElementById('valorPagamento').value,
    };
    const despesas = carregarDespesas();
    const indiceSelecionado = obterIndiceSelecionado();
    despesas[indiceSelecionado] = despesa;
    salvarDespesas(despesas);
    alert('Alterado com sucesso');
    location.href = 'index.html';
}
