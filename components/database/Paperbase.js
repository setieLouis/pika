import Realm from 'realm';

const tag = {
  name: 'tag',
  primaryKey: 'id',
  properties: {
    id: 'int',
    tag: 'string',
  },
};

const paperMeta = {
  name: 'paper_meta',
  primaryKey: 'id',
  properties: {
    id: 'int',
    tag: 'int', // tag foreign key
    negozio: 'string',
    indirizzo: 'string',
    data: 'date',
  },
};

const block = {
  name: 'block',
  primaryKey: 'papermeta', //
  properties: {
    papermeta: 'int',
    content: 'string',
  },
};

const repo = new Realm({schema: [paperMeta, block, tag]});

// find All
export function findAllTag() {
  const response = repo.objects('tag');
  return toArray(response);
}

export function findAllMeta() {
  const response = repo.objects('paper_meta');
  return toArray(response);
}

export function findAllBlock() {
  const response = repo.objects('block');
  return toArray(response);
}

// find by Id
export function findTagByid(id) {
  const response = repo.objects('tag').filtered('id =' + id);
  return toArray(response);
}

export function findMetaByid(id) {
  const response = repo.objects('paper_meta').filtered('id =' + id);
  return toArray(response);
}

export function findBlockByid(id) {
  const response = repo.objectForPrimaryKey('block', id);
  return response; //toArray(response);
}

// Save
export function saveTag(tag) {
  repo.write(() => {
    repo.create('tag', tag, Realm.UpdateMode.All);
  });
}

export function saveMeta(paperMeta) {
  repo.write(() => {
    repo.create('paper_meta', paperMeta, Realm.UpdateMode.All);
  });
}

export function saveBlock(block) {
  repo.write(() => {
    repo.create('block', block, Realm.UpdateMode.All);
  });
}

function tagModel(id, tag) {
  return {
    id: id,
    tag: tag,
  };
}

function metaModel(id, tag, negozio, indirizzo, data) {
  return {
    id: id,
    tag: tag,
    negozio: negozio,
    indirizzo: indirizzo,
    data: data,
  };
}

function blockModel(papermeta, content) {
  return {
    papermeta: papermeta,
    content: content,
  };
}

const t1 = tagModel(0, 'CIBO');
//Mocked list
const m1 = metaModel(0, 0, 'serafino', 'via garibaldi', '01 Apr 2008');
const b1 = blockModel(
  0,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);

//Mocked list
const m2 = metaModel(1, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m3 = metaModel(2, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m4 = metaModel(3, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m5 = metaModel(4, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m6 = metaModel(5, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m7 = metaModel(6, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m8 = metaModel(7, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m9 = metaModel(8, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m10 = metaModel(9, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');
const m11 = metaModel(10, 0, 'Il pane buono', 'via verdi 32', '01 Apr 2008');

const b2 = blockModel(
  1,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);
const b3 = blockModel(
  2,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);

const b4 = blockModel(
  3,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);

const b5 = blockModel(
  4,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);
const b6 = blockModel(
  5,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);
const b7 = blockModel(
  6,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);
const b8 = blockModel(
  7,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);
const b9 = blockModel(
  8,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);
const b10 = blockModel(
  9,
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
);

function toArray(collect) {
  let list = [];
  for (let p of collect) {
    list.push(p);
  }
  return list;
}
saveTag(t1);
saveMeta(m1);
saveBlock(b1);
saveMeta(m2);
saveMeta(m3);
saveMeta(m4);
saveMeta(m5);
saveMeta(m6);
saveMeta(m7);
saveMeta(m8);
saveMeta(m9);
saveMeta(m10);
saveMeta(m11);

saveBlock(b2);
saveBlock(b3);
saveBlock(b4);
saveBlock(b5);
saveBlock(b6);
saveBlock(b7);
saveBlock(b8);
saveBlock(b9);
saveBlock(b10);
