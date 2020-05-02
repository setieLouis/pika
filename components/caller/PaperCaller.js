import PAPER from '../static/PAPERS';

export function getPaperList(tagName) {
  const tag = PAPER.filter(item => {
    return item.tag === tagName;
  });
  if (tag.length > 0) {
    return tag[0];
  }
  return {};
}

export function getPaper(tagName, paperId) {
  let tag = getPaperList(tagName);

  let paper = tag.papers.filter(item => {
    return item.id === paperId;
  });
  console.log(tag);
  if (paper.length > 0) {
    return paper[0];
  }

  return {};
}
