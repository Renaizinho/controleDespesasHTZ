import { carregarDespesas, guardarIndiceSelecionado, removerContatoNoIndice, salvarDespesas } from "./storage.js";
import { format } from 'date-fns';

document.addEventListener('DOMContentLoaded', aoCarregar);

function aoCarregar() {
    const despesas = carregarDespesas();
    adicionarIndiceOriginal(despesas)
    desenharDespesas(despesas);
    const nomeFiltro = document.getElementById('nomeFiltro');
    nomeFiltro.addEventListener('keyup', aplicarFiltro);
    document.getElementById('filtrar').addEventListener('click', filtrarPelaSituacao);
    const tbody = document.querySelector('tbody');
    document.addEventListener('dblclick', aoAlterarSituacao);
    document.getElementById('mesFiltro').addEventListener('change', filtrarPeloMes);
    document.getElementById('filtrarData').addEventListener('click', filtrarPorData);
}

function adicionarIndiceOriginal(despesas){
    despesas.forEach((despesa, indice) =>{
        despesa.indiceOriginal = indice;
    });
}

export function desenharDespesas(despesas) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < despesas.length; i++) {
        const tr = criarLinhaDeDespesa(despesas[i], despesas[i].indiceOriginal);
        if (despesas[i].situacao === 'Pago') {
            tr.classList.add('pago');
        } else if (despesas[i].situacao === 'Aberto') {
            tr.classList.add('aberto');
        }
        tbody.appendChild(tr);
    }
}

export function criarLinhaDeDespesa(despesa, id) {
    const dataPagamento = new Date(despesa.dataPagamento.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3') + 'T00:00:00');
    const formattedDataPagamento = format(dataPagamento, 'dd-MM-yyyy');

    const tr = document.createElement('tr');
    tr.setAttribute('data-id', id);

    const tdDia = document.createElement('td');
    tdDia.innerText = despesa.dia;
    tr.appendChild(tdDia);

    const tdDescricao = document.createElement('td');
    tdDescricao.innerText = despesa.descricao;
    tr.appendChild(tdDescricao);

    const tdValor = document.createElement('td');
    tdValor.innerText = despesa.valor;
    tr.appendChild(tdValor);

    const tdSituacao = document.createElement('td');
    tdSituacao.innerText = despesa.situacao;
    tr.appendChild(tdSituacao);

    const tdDataPagamento = document.createElement('td');
    tdDataPagamento.innerText = formattedDataPagamento;
    tr.appendChild(tdDataPagamento);

    const tdValorPagamento = document.createElement('td');
    tdValorPagamento.innerText = despesa.valorPagamento;
    tr.appendChild(tdValorPagamento);

    const tdAlteracao = document.createElement('td');
    const botaoAlterar = document.createElement('button');
    botaoAlterar.innerText = 'Alterar';
    botaoAlterar.addEventListener('click', () => aoAlterar(id));
    tdAlteracao.appendChild(botaoAlterar);
    tr.appendChild(tdAlteracao);

    const tdRemocao = document.createElement('td');
    const botaoRemover = document.createElement('button');
    botaoRemover.innerText = 'Remover';
    botaoRemover.addEventListener('click', () => aoRemover(id));
    tdRemocao.appendChild(botaoRemover);
    tr.appendChild(tdRemocao);

    return tr;
}

function aoAlterar(id) {
    console.log(id)
    guardarIndiceSelecionado(id);
    location.href = 'alterar.html';
}

function aoRemover(id) {
    removerContatoNoIndice(id);
    alert('Removido com sucesso');
    location.href = 'index.html';
}

function aplicarFiltro() {
    const nomeFiltro = document.getElementById('nomeFiltro').value.toLowerCase();
    const todasDespesas = carregarDespesas();
    adicionarIndiceOriginal(todasDespesas); // Adiciona índice original antes de filtrar
    const despesasFiltradas = todasDespesas.filter(despesa => despesa.descricao.toLowerCase().includes(nomeFiltro));
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < despesasFiltradas.length; i++) {
        const tr = criarLinhaDeDespesa(despesasFiltradas[i], despesasFiltradas[i].indiceOriginal);
        tbody.appendChild(tr);
    }
}

function filtrarPelaSituacao() {
    const situacaoFiltro = document.getElementById('situacaoFiltro').value;
    const todasDespesas = carregarDespesas();
    adicionarIndiceOriginal(todasDespesas);
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < todasDespesas.length; i++) {
        const despesa = todasDespesas[i];
        if (situacaoFiltro === 'Ambos' || despesa.situacao === situacaoFiltro) {
            const tr = criarLinhaDeDespesa(despesa, despesa.indiceOriginal);
            if (despesa.situacao === 'Pago') {
                tr.classList.add('pago');
            } else if (despesa.situacao === 'Aberto') {
                tr.classList.add('aberto');
            }
            tbody.appendChild(tr);
        }
    }
}

function aoAlterarSituacao(event) {
    const td = event.target;
    const tr = td.parentElement;
    const indice = tr.sectionRowIndex;
    const despesas = carregarDespesas();
    const despesa = despesas[indice];
    console.log(despesas);
    console.log(indice);
    console.log(despesa);
    if (despesa && despesa.situacao) {
        if (despesa.situacao === 'Aberto') {
            despesa.situacao = 'Pago';
        } else if (despesa.situacao === 'Pago') {
            despesa.situacao = 'Aberto';
        }
        salvarDespesas(despesas);
        document.querySelector('tbody').innerText = '';
        desenharDespesas(despesas);
    } else {
        console.error('Propriedade "situacao" faltando na despesa.');
    }
}

function filtrarPeloMes() {
    const mesFiltro = document.getElementById('mesFiltro').value;
    const todasDespesas = carregarDespesas();
    adicionarIndiceOriginal(todasDespesas);

    const despesasFiltradas = todasDespesas.filter((despesa) => {
        // A função abaixo extrai o mês da data no formato 'mm'
        const mesDespesa = despesa.dataPagamento.split('-')[1];
        return mesDespesa === mesFiltro;
    });

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < despesasFiltradas.length; i++) {
        const tr = criarLinhaDeDespesa(despesasFiltradas[i], despesasFiltradas[i].indiceOriginal);
        tbody.appendChild(tr);
    }
}

function filtrarPorData() {
    const dataInicial = new Date(document.getElementById('dataInicial').value);
    const dataFinal = new Date(document.getElementById('dataFinal').value);
    
    if (dataInicial > dataFinal) {
        alert('Data Inicial deve ser anterior à Data Final.');
        return;
    }
    
    const todasDespesas = carregarDespesas();
    adicionarIndiceOriginal(todasDespesas); // Adiciona índice original antes de filtrar

    const despesasFiltradas = todasDespesas.filter((despesa) => {
        const dataDespesa = new Date(despesa.dataPagamento.replace(/(\d{2})-(\d{2})-(\d{4})/, '$2/$1/$3') + 'T00:00:00');
        return dataDespesa >= dataInicial && dataDespesa <= dataFinal;
    });

    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < despesasFiltradas.length; i++) {
        const tr = criarLinhaDeDespesa(despesasFiltradas[i], despesasFiltradas[i].indiceOriginal);
        tbody.appendChild(tr);
    }
}
