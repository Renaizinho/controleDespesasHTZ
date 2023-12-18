const CHAVE_DESPESAS = 'despesas';
const CHAVE_INDICE_SELECIONADO = 'indiceSelecionado';

export function carregarDespesas(){
    const despesasString = localStorage.getItem(CHAVE_DESPESAS);
    if(!despesasString){
        return []
    }
    const despesas = JSON.parse(despesasString);
    if (!Array.isArray(despesas)) {
        return [];
    }
    return despesas;
}

export function salvarDespesas(despesas){
    localStorage.setItem(CHAVE_DESPESAS, JSON.stringify(despesas));
}

export function guardarIndiceSelecionado(indice){
    localStorage.setItem(CHAVE_INDICE_SELECIONADO, String(indice));
}

export function obterIndiceSelecionado(){
    const indice = localStorage.getItem(CHAVE_INDICE_SELECIONADO);
    if (indice === null){
        return -1
    }
    return Number(indice);
}

export function removerContatoNoIndice(indice){
    const despesas = carregarDespesas();
    despesas.splice(indice, 1);
    salvarDespesas(despesas);
}