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
    tag: 'int', // tag foreign key
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
    content: 'string',
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
  const response = repo.objects(SHOP);
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
  console.log(shop_id)
  return findAllReceipt().filtered('shop = "' + shop_id.toString() + '"');
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

const content2 =
  '                {*}*ESSELUNGA S.P.A*{*}             ' +
  '\n            DOCUMENTO COMMERCIALE            ' +
  '\n' +
  '\n**********************************************' +
  '\n*****       RECEVUTA DI PAGAMENTO        *****' +
  '\nEsselunga via Famagosta\nPrepagate Virtuali' +
  '\nS/E-CE 1163' +
  '\nCASSA: 006 ID 00116306' +
  '\nOPER: 27214 STAN 003452' +
  '\nC 721973******4850 keyed' +
  '\nCOD.AUT. 367506' +
  '\nRESIDUO: 0,00\nACQ.ID 00000000029' +
  '\n' +
  '\n' +
  '{m*}TOTALE                    3,55{m*}' +
  '\n' +
  '\nTRANSAZIONE AUTORIZZATTA' +
  '\n*****      {RECEVUTA DI PAGAMENTO}       *****' +
  '\n**********************************************' +
  '\n' +
  '\n' +
  '{q}ciao mama come va{q}' +
  '\n' +
  '\n            DOCUMENTO COMMERCIALE            ';

saveReceipt({
  shop: shopModel('0', 'serafino', 'via Settembre'),
  receipt: receiptModel(content2, '0'),
});
saveReceipt({
  shop: shopModel('0', 'serafino', 'via Settembre'),
  receipt: receiptModel(content2, '0'),
});
saveReceipt({
  shop: shopModel('0', 'serafino', 'via Settembre'),
  receipt: receiptModel(content2, '0'),
});

saveReceipt({
  shop: shopModel('1', 'Pizza Per Tutti', 'Pzza 25 novembre'),
  receipt: receiptModel(content2, '1'),
});
saveReceipt({
  shop: shopModel('1', 'Pizza Per Tutti', 'Pzza 25 novembre'),
  receipt: receiptModel(content2, '1'),
});
saveReceipt({
  shop: shopModel('1', 'Pizza Per Tutti', 'Pzza 25 novembre'),
  receipt: receiptModel(content2, '1'),
});

saveReceipt({
  shop: shopModel('2', 'Grande Mercato', 'Pzza 25 novembre'),
  receipt: receiptModel(content2, '2'),
});
saveReceipt({
  shop: shopModel('2', 'Grande Mercato', 'Pzza 25 novembre'),
  receipt: receiptModel(content2, '2'),
});
saveReceipt({
  shop: shopModel('2', 'Grande Mercato', 'Pzza 25 novembre'),
  receipt: receiptModel(content2, '2'),
});

saveReceipt({
  shop: shopModel('3', 'Piccolo Mercato', 'via della disperazione 89'),
  receipt: receiptModel(content2, '3'),
});
saveReceipt({
  shop: shopModel('3', 'Piccolo Mercato', 'via della disperazione 89'),
  receipt: receiptModel(content2, '3'),
});
saveReceipt({
  shop: shopModel('3', 'Piccolo Mercato', 'via della disperazione 89'),
  receipt: receiptModel(content2, '3'),
});

saveReceipt({
  shop: shopModel('4', 'Jolie', 'ia della verdi 89'),
  receipt: receiptModel(content2, '4'),
});
saveReceipt({
  shop: shopModel('4', 'Jolie', 'ia della verdi 89'),
  receipt: receiptModel(content2, '4'),
});
saveReceipt({
  shop: shopModel('4', 'Jolie', 'via della verdi 89'),
  receipt: receiptModel(content2, '4'),
});

saveReceipt({
  shop: shopModel('5', 'Petite fille', 'Piazza Garilbadi Milano verdi 89'),
  receipt: receiptModel(content2, '5'),
});
saveReceipt({
  shop: shopModel('5', 'Petite fille', 'Piazza Garilbadi Milano verdi 89'),
  receipt: receiptModel(content2, '5'),
});
saveReceipt({
  shop: shopModel('5', 'Petite fille', 'Piazza Garilbadi Milano verdi 89'),
  receipt: receiptModel(content2, '5'),
});

saveReceipt({
  shop: shopModel('6', 'Al lago', 'via Como Milano verdi 89'),
  receipt: receiptModel(content2, '6'),
});
saveReceipt({
  shop: shopModel('6', 'Al lago', 'via Como Milano verdi 89'),
  receipt: receiptModel(content2, '6'),
});
saveReceipt({
  shop: shopModel('6', 'Al lago', 'via Como Milano verdi 89'),
  receipt: receiptModel(content2, '6'),
});

saveReceipt({
  shop: shopModel('7', 'Da Yemi', 'via della MyGosh 89'),
  receipt: receiptModel(content2, '7'),
});
saveReceipt({
  shop: shopModel('7', 'Da Yemi', 'via della MyGosh 89'),
  receipt: receiptModel(content2, '7'),
});
saveReceipt({
  shop: shopModel('7', 'Da Yemi', 'via della MyGosh 89'),
  receipt: receiptModel(content2, '7'),
});

saveReceipt({
  shop: shopModel('8', 'Mare alto', 'via Rimino Milano verdi 89'),
  receipt: receiptModel(content2, '8'),
});

saveReceipt({
  shop: shopModel('8', 'Mare alto', 'via Rimino Milano verdi 89'),
  receipt: receiptModel(content2, '8'),
});

saveReceipt({
  shop: shopModel('8', 'Mare alto', 'via Rimino Milano verdi 89'),
  receipt: receiptModel(content2, '8'),
});
