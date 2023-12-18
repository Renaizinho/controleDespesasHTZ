import { carregarDespesas, salvarDespesas } from "./storage.js";

document.addEventListener('DOMContentLoaded', aoCarregar);

function aoCarregar() {
    document.getElementById('salvar').addEventListener('click', aoSalvar);
}

function aoSalvar(event) {
    event.preventDefault();
    const dia = document.getElementById('dia').value;
    if (dia > 31 || dia < 0) {
        alert('Favor inserir um número entre 1 e 30');
        return;
    }

    const despesa = {
        dia: dia,
        descricao: document.getElementById('descricao').value,
        valor: document.getElementById('valor').value,
        situacao: document.getElementById('situacao').value,
        dataPagamento: document.getElementById('dataPagamento').value,
        valorPagamento: document.getElementById('valorPagamento').value,
    };
    const despesas = carregarDespesas();
    despesas.push(despesa);
    salvarDespesas(despesas);
    alert('Salvo com sucesso.');
    // Redireciona
    //location.href = 'index.html';
}
