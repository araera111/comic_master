import { ViewMode } from '../types/ViewerType';

export const getPageUrlString = (pageNumber: number): string => pageNumber.toString().padStart(4, '0');
export const fixNextPage = (page: number, arrLength: number, mode: ViewMode): number => {
  if (mode === 'spreadStartRight' && page + 2 === arrLength) return 0;
  if (mode === 'spreadStartRight' && arrLength - (page + 2) < 2) return page + 1;
  if (mode === 'spreadStartRight') return page + 2;
  if (page + 1 >= arrLength) return 0;
  return page + 1;
};

export const fixPrevPage = (page: number, arrLength: number, mode: ViewMode): number => {
  if (mode === 'spreadStartRight' && page - 2 < 0) return arrLength - 2;
  if (mode === 'spreadStartRight') return page - 2;

  /* 0を下回ったときは最終ページに戻す */
  if (page - 1 < 0) return arrLength - 1;
  return page - 1;
};

/*
    const page = 3;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 0;
*/
export const nextOnePage = (page: number, arrLength: number, mode: ViewMode): number => {
  if (mode === 'spreadStartRight' && page + 2 === arrLength) return 0;
  if (page + 1 >= arrLength) return 0;
  return page + 1;
};

/*
    const page = 0;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 3;
*/
export const prevOnePage = (page: number, arrLength: number, mode: ViewMode): number => {
  if (mode === 'spreadStartRight' && page === 0) return arrLength - 2;
  if (page - 1 < 0) return arrLength - 1;
  return page - 1;
};

/*
    const page = 4;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 3;
*/
export const fixPage = (page: number, arrLength: number, mode: ViewMode): number => {
  if (mode === 'spreadStartRight' && page + 1 === arrLength) return page - 1;
  return page;
};

/*
  7のときは2だけど(5を引けばいいけど), 18ページ進むときは？ 5で割った余り。
  0を下回ったときは？ arrLength-1を
*/
export const movePage = (page: number, move: number, arrLength: number, mode: ViewMode): number => {
  const nextPage = page + move;
  if (nextPage < 0) return arrLength + nextPage;
  if (arrLength - 1 <= nextPage) return (nextPage % (arrLength - 1)) - 1;
  return nextPage;
};
