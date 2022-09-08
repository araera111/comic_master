import { includes, prop, sortBy } from 'rambda';
import { match } from 'ts-pattern';
import { PageItem, SortMode, ViewMode } from '../types/ViewerType';

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
export const movePage = (page: number, move: number, arrLength: number): number => {
  const nextPage = page + move;
  if (nextPage < 0) return arrLength + nextPage;
  if (arrLength - 1 <= nextPage) return (nextPage % (arrLength - 1)) - 1;
  return nextPage;
};

export const getThumbnailIndex = (fileName: string, pageItems: PageItem[]): number =>
  pageItems.findIndex((i) => i.fileName === fileName);

export const getThumbnailPage = (fileName: string, ThumbnailPages: PageItem[][]): number =>
  ThumbnailPages.findIndex((pages) =>
    includes(
      fileName,
      pages.map((i) => i.fileName)
    )
  );

export const getFileName = (pageItems: PageItem[], page: number): string => pageItems[page].fileName;

export const getNextSortMode = (nowSortMode: SortMode) =>
  match(nowSortMode)
    .with('fileName', () => 'timestamp' as SortMode)
    .with('timestamp', () => 'timestampdown' as SortMode)
    .with('timestampdown', () => 'fileName' as SortMode)
    .exhaustive();

export const sortByTimestamp = (pageItems: PageItem[]): PageItem[] => sortBy(prop('mtime'))(pageItems);
export const sortByFileName = (pageItems: PageItem[]): PageItem[] => sortBy(prop('fileName'))(pageItems);

export const setSort = (pageItems: PageItem[], sortMode: SortMode): PageItem[] =>
  match(sortMode)
    .with('fileName', () => sortByFileName(pageItems))
    .with('timestamp', () => sortByTimestamp(pageItems))
    .with('timestampdown', () => sortByTimestamp(pageItems).reverse())
    .exhaustive();
