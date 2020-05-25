import Realm from 'realm';

/*
  ===================================
  Database Constances
  ===================================
 */

const TAG = 'tag';
const PAPER_INFO = 'info';
const BLOCK = 'block';
const ID = 'id';
const INFO = 'info';
const RECEIPT = 'receipt';
const SHOP = 'shop';

/*
  ===================================
  Schema creation
  ===================================
 */

const tag = {
  name: TAG,
  primaryKey: ID,
  properties: {
    id: 'int',
    tag: 'string',
    icon: 'string',
  },
};

const paperMeta = {
  name: PAPER_INFO,
  primaryKey: ID,
  properties: {
    id: 'int', // negozio database
    // tag: 'int', // tag foreign key
    negozio: 'string',
    indirizzo: 'string',
    data: 'string',
  },
};

const shop = {
  name: SHOP,
  primaryKey: ID,
  properties: {
    id: 'string',
    name: 'string',
    address: 'string',
    last_update_date: 'date',
  },
};

const receipt = {
  name: RECEIPT,
  primaryKey: ID,
  properties: {
    id: 'int',
    shop: 'string',
    content: ' string',
  },
};

const block = {
  name: BLOCK,
  primaryKey: INFO, //
  properties: {
    info: 'int',
    content: 'string',
  },
};

const repo = new Realm({schema: [paperMeta, block, tag, shop, receipt]});

/*
  ===================================
  Find All service
  ===================================
 */
export function findAllTag() {
  const response = repo.objects(TAG);
  return toArray(response);
}

export function findAllInfo() {
  const response = repo.objects(PAPER_INFO);
  // return toArray(response);
  return response;
}

export function findAllBlock() {
  const response = repo.objects(BLOCK);
  return toArray(response);
}

export function findAllReceipt() {
  const response = repo.objects(RECEIPT);
  return response;
}

export function findAllShop() {
  const response = repo.objects(RECEIPT);
  return response;
}

/*
  ===================================
  Find by Id service
  ===================================
 */

export function findTagByid(id) {
  const response = repo.objectForPrimaryKey(TAG, id).filtered(ID + '=' + id);
  return toArray(response);
}

export function findMetaByTagId(id) {
  const response = repo.objects(PAPER_INFO).filtered('tag = ' + id);
  return toArray(response);
}

export function findBlockByid(id) {
  const response = repo.objectForPrimaryKey(BLOCK, id);
  return response; //toArray(response);
}

export function findReceiptByShopId(shop_id) {
  return findAllReceipt().filtered('shop=' + shop_id);
}

/*
  ===================================
   Save service
  ===================================
 */

export function saveTag(tag) {
  repo.write(() => {
    repo.create(TAG, tag, Realm.UpdateMode.All);
  });
}

export function saveMeta(info) {
  repo.write(() => {
    repo.create(PAPER_INFO, info, Realm.UpdateMode.All);
  });
}

export function saveBlock(block) {
  repo.write(() => {
    repo.create(BLOCK, block, Realm.UpdateMode.All);
  });
}

export function saveShop(shop) {
  repo.write(() => {
    repo.create(SHOP, shop, Realm.UpdateMode.Modified);
  });
}

export function saveReceipt(receipt) {
  saveShop(receipt.shop);
  repo.write(() => {
    repo.create(RECEIPT, receipt.receipt, Realm.UpdateMode.All);
  });
}

/*
  ===================================
   Delete service
  ===================================
 */

export function deleteTag(tag) {
  repo.write(() => {
    let el = repo.create(TAG, tag, Realm.UpdateMode.All);
    repo.delete(el);
  });
}

export function deleteInfo(info) {
  repo.write(() => {
    let tmpInfo = repo.create(PAPER_INFO, info, Realm.UpdateMode.All);
    repo.delete(tmpInfo);
  });
}

export function deleteShop(shop) {
  repo.write(() => {
    let tmpShop = repo.create(SHOP, shop, Realm.UpdateMode.All);
    repo.delete(tmpShop);
  });
}

export function deleteReceipt(receipt) {
  repo.write(() => {
    let tmpReceipt = repo.create(RECEIPT, receipt, Realm.UpdateMode.All);
    repo.delete(tmpReceipt);
  });
}

/*
  ===================================
   ID creator  service
  ===================================
 */

function createId(obj, sortDescriptor) {
  const response = repo.objects(obj).sorted(sortDescriptor, true)[0];
  return response;
}

export function tagId() {
  const elem = createId(TAG, ID);
  if (elem) {
    return elem.id + 1;
  }
  return 0;
}

function metaId() {
  const elem = createId(PAPER_INFO, ID);
  if (elem) {
    return elem.id + 1;
  }
  return 0;
}

function blockId() {
  const elem = createId(BLOCK, INFO);
  if (elem) {
    return elem.info + 1;
  }
  return 0;
}

function receiptId() {
  const elem = createId(RECEIPT, ID);
  if (elem) {
    return elem.id + 1;
  }
  return 0;
}

/*
  ===================================
   Model creator  service
  ===================================
 */

export function tagModel(tag, icon, id) {
  id = id === undefined || id === -1 ? tagId() : id;
  const el = {
    id: id,
    tag: tag,
    icon: icon,
  };
  return el;
}

function metaModel(tag, negozio, indirizzo, data, id = metaId()) {
  return {
    id: id,
    tag: tag,
    negozio: negozio,
    indirizzo: indirizzo,
    data: data,
  };
}

function blockModel(content, info = blockId()) {
  return {
    info: info,
    content: content,
  };
}

function receiptModel(content, shop) {
  return {
    id: receiptId(),
    shop: shop,
    content: content,
  };
}

function shopModel(id, name, address) {
  return {
    id: id,
    name: name,
    address: address,
    last_update_date: new Date(),
  };
}

/*
  ===================================
   Utility
  ===================================
 */

export function toArray(collect) {
  let list = [];
  for (let p of collect) {
    list.push(p);
  }
  return list;
}
const content =
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}';

const t1 = tagModel('default', 'carrot', 0);
const m1 = metaModel(0, 'berafino', 'via garibaldi', '01 Apr 2008', 0);
const m2 = metaModel(0, 'alberto', 'via garibaldi', '01 Apr 2008', 1);
const m3 = metaModel(0, 'emilie', 'via garibaldi', '01 Apr 2008', 2);
const m4 = metaModel(0, 'camona', 'via garibaldi', '01 Apr 2008', 3);
const m5 = metaModel(0, 'alberto', 'via garibaldi', '01 Apr 2008', 5);
const m6 = metaModel(0, 'emilie', 'via garibaldi', '01 Apr 2008', 6);
const m7 = metaModel(0, 'camona', 'via garibaldi', '01 Apr 2008', 7);
const m8 = metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 8);
const m9 = metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 9);
const m10 = metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 10);
const b1 = blockModel(
  '|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}|                *ESSELUNGA S.P.A*             {*}|            DOCUMENTO COMMERCIALE            |||**********************************************|*****       RECEVUTA DI PAGAMENTO        *****|Esselunga via Famagosta|Prepagate Virtuali|S/E-CE 1163|CASSA: 006 ID 00116306|OPER: 27214 STAN 003452|C 721973******4850 keyed|COD.AUT. 367506|RESIDUO: 0,00|ACQ.ID 00000000029|||TOTALE                    3,55|||TRANSAZIONE AUTORIZZATTA|*****      {RECEVUTA DI PAGAMENTO}       *****|**********************************************| ciao mama come va {q}',
  0,
);

saveTag(t1);
saveMeta(m1);
saveMeta(m2);
saveMeta(m3);
saveMeta(m4);
saveMeta(m5);
saveMeta(m6);
saveMeta(m7);
saveMeta(m8);
saveMeta(m9);
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 11));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 12));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 13));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 14));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 15));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 16));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 17));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 18));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 19));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 20));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 21));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 22));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 23));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 24));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 25));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 26));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 27));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 28));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 29));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 30));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 31));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 32));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 33));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 34));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 35));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 35));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 36));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 37));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 38));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 39));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 40));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 41));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 42));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 43));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 44));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 45));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 46));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 47));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 48));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 49));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 50));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 51));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 52));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 53));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 54));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 55));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 56));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 57));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 58));
saveMeta(metaModel(0, 'dario', 'via garibaldi', '01 Apr 2008', 59));

saveMeta(m10);

saveBlock(b1);

saveReceipt({
  shop: shopModel('1', 'serafino', 'via garibaldi crema'),
  receipt: receiptModel(content, '1'),
});

saveReceipt({
  shop: shopModel('1', 'serafino', 'via garibaldi crema'),
  receipt: receiptModel(content, '1'),
});

saveReceipt({
  shop: shopModel('1', 'serafino', 'via garibaldi crema'),
  receipt: receiptModel(content, '1'),
});
