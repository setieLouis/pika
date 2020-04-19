import PAPER from '../static/PAPERS';

export function getPaperList(tagName) {
  const tag = PAPER.filter(item => {
    return item.tag === tagName;
  });
  if (tag.length >= 0) {
    return tag[0];
  }
  return {};
}
export function getCiao(nome) {
  console.log('Ciao');
}
