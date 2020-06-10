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

export function receiptModel(content, shop) {
  return {
    id: receiptId(),
    shop: shop,
    content: content,
  };
}

export function shopModel(id, name, address) {
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
