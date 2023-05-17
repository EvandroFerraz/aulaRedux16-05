const Redux = require('redux');

// Essa é a função criadora da ação Criar Contrato
const criarContrato = (nome, taxa) => {
  // O que é retornado pela função criadora é a ação em si
  return {
    type: 'CRIAR_CONTRATO',
    dados: {
      nome,
      taxa,
    },
  };
};

// Essa é a função criadora da ação Cancelar Contrato
const cancelarContrato = (nome) => {
  // O que é retornado pela função criadora é a ação em si
  return {
    type: 'CANCELAR_CONTRATO',
    dados: {
      nome,
    },
  };
};

// Essa é a função criadora da ação Solicitar Cashback
const solicitarCashback = (nome, valor) => {
  // O que é retornado pela função criadora é a ação em si
  return {
    type: 'CASHBACK',
    dados: {
      nome,
      valor,
    },
  };
};

// Reducer que implementa a lógica do Departamento de Pedidos de Cashback
const historicoDePedidosDeCashback = (
  historicoDePedidosDeCashbackAtual = [],
  acao
) => {
  if (acao.type === 'CASHBACK') {
    return [...historicoDePedidosDeCashbackAtual, acao.dados];
  } else {
    return historicoDePedidosDeCashbackAtual;
  }
};

// Reducer que implementa a lógica do Departamento de Caixa
const caixa = (dinheiroEmCaixa = 0, acao) => {
  if (acao.type === 'CASHBACK') {
    dinheiroEmCaixa -= acao.dados.valor;
  } else if (acao.type == 'CRIAR_CONTRATO') {
    dinheiroEmCaixa += acao.dados.taxa;
  }
  return dinheiroEmCaixa;
};

// Reducer que implementa a lógica do Departamente de Pedidos de Contrato
const contratos = (listaDeContratosAtual = [], acao) => {
  if (acao.type === 'CRIAR_CONTRATO') {
    return [...listaDeContratosAtual, acao.dados];
  } else if (acao.type === 'CANCELAR_CONTRATO') {
    return listaDeContratosAtual.filter((c) => c.nome !== acao.dados.nome);
  }
  return listaDeContratosAtual;
};

const { createStore, combineReducers } = Redux;

const todosOsReducers = combineReducers({
  historicoDePedidosDeCashback,
  caixa,
  contratos,
});

const store = createStore(todosOsReducers);

const acaoContratoJose = criarContrato('José', 50);
store.dispatch(acaoContratoJose);
console.log(store.getState());

const acaoContratoMaria = criarContrato('Maria', 50);
store.dispatch(acaoContratoMaria);
console.log(store.getState());

const acaoCashbackMaria = solicitarCashback('Maria', 10);
store.dispatch(acaoCashbackMaria);
console.log(store.getState());

const acaoCashbackJose = solicitarCashback('José', 20);
store.dispatch(acaoCashbackJose);
console.log(store.getState());

const acaoCancelaContratoMaria = cancelarContrato('Maria');
store.dispatch(acaoCancelaContratoMaria);
console.log(store.getState());
