import { ViewMode } from '../types/ViewerType';
import { fixNextPage, fixPage, fixPrevPage, nextOnePage, prevOnePage } from './viewerUtil';

describe('fixNextPage', () => {
  it('case1, page2, length3, mode:single -> 0', () => {
    const page = 2;
    const arrLength = 3;
    const mode: ViewMode = 'single';
    const result = 0;
    expect(fixNextPage(page, arrLength, mode)).toBe(result);
  });

  it('case2, page0, length3, mode:single -> 1', () => {
    const page = 0;
    const arrLength = 3;
    const mode: ViewMode = 'single';
    const result = 1;
    expect(fixNextPage(page, arrLength, mode)).toBe(result);
  });

  it('case3, page0, length3, mode:spread -> 2', () => {
    const page = 0;
    const arrLength = 3;
    const mode: ViewMode = 'spreadStartRight';
    const result = 1;
    expect(fixNextPage(page, arrLength, mode)).toBe(result);
  });

  /* length4は[1, 2, 3, 4]で、いま2のときは3(index2) */
  it('case4, page1, length4, mode:spread -> 2', () => {
    const page = 1;
    const arrLength = 4;
    const mode: ViewMode = 'spreadStartRight';
    const result = 2;
    expect(fixNextPage(page, arrLength, mode)).toBe(result);
  });

  it('case5, page2, length10, mode:spread -> 4', () => {
    const page = 2;
    const arrLength = 10;
    const mode: ViewMode = 'spreadStartRight';
    const result = 4;
    expect(fixNextPage(page, arrLength, mode)).toBe(result);
  });

  /* 0,1,2,3,4で3であれば最後なんで0ですね */
  it('case6, page3, length5, mode:spread -> 0', () => {
    const page = 3;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 0;
    expect(fixNextPage(page, arrLength, mode)).toBe(result);
  });
});

/*
  length5は[0,1,2,3,4]
*/
describe('nextOnePage', () => {
  it('case1, page0, length5, mode:single -> 0', () => {
    const page = 0;
    const arrLength = 5;
    const mode: ViewMode = 'single';
    const result = 1;
    expect(nextOnePage(page, arrLength, mode)).toBe(result);
  });
  it('case2, page0, length5, mode:single -> 1', () => {
    const page = 0;
    const arrLength = 5;
    const mode: ViewMode = 'single';
    const result = 1;
    expect(nextOnePage(page, arrLength, mode)).toBe(result);
  });
  it('case2, page3, length5, mode:spread -> 0', () => {
    const page = 3;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 0;
    expect(nextOnePage(page, arrLength, mode)).toBe(result);
  });
});

/* [0,1,2,3,4] */
describe('prevOnePage', () => {
  it('case1, page1, length5, mode:single -> 0', () => {
    const page = 1;
    const arrLength = 5;
    const mode: ViewMode = 'single';
    const result = 0;
    expect(prevOnePage(page, arrLength, mode)).toBe(result);
  });

  it('case2, page0, length5, mode:spread -> 0', () => {
    const page = 0;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 3;
    expect(prevOnePage(page, arrLength, mode)).toBe(result);
  });
});

/*
  length3 = [0,1,2]
*/
describe('fixPrevPage', () => {
  it('case1, page2, length3, mode:single -> 0', () => {
    const page = 2;
    const arrLength = 3;
    const mode: ViewMode = 'single';
    const result = 1;
    expect(fixPrevPage(page, arrLength, mode)).toBe(result);
  });

  it('case2, page0, length3, mode:single -> 2', () => {
    const page = 0;
    const arrLength = 3;
    const mode: ViewMode = 'single';
    const result = 2;
    expect(fixPrevPage(page, arrLength, mode)).toBe(result);
  });

  /* length5 [0, 1, 2, 3, 4] */
  it('case3, page3, length5, mode:spread -> 2', () => {
    const page = 3;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 1;
    expect(fixPrevPage(page, arrLength, mode)).toBe(result);
  });

  it('case4, page1, length5, mode:spread -> 4', () => {
    const page = 1;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 3;
    expect(fixPrevPage(page, arrLength, mode)).toBe(result);
  });
});

describe('fixPage', () => {
  /* [0, 1, 2, 3, 4] */
  it('case1: page4, arrLength:5 mode:spread -> 3,', () => {
    const page = 4;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 3;
    expect(fixPage(page, arrLength, mode)).toBe(result);
  });

  it('case2: page3, arrLength:5 mode:spread -> 3,', () => {
    const page = 0;
    const arrLength = 5;
    const mode: ViewMode = 'spreadStartRight';
    const result = 0;
    expect(fixPage(page, arrLength, mode)).toBe(result);
  });
});
