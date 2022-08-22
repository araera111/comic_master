import { getExtName } from './dropOperationUtil';

describe('getExtName', () => {
  it('case1: aaa.jpg', () => {
    const fileName = 'aaa.jpg';
    const result = 'jpg';
    expect(getExtName(fileName)).toBe(result);
  });

  it('case2: aaa.txt', () => {
    const fileName = 'aaa.txt';
    const result = 'txt';
    expect(getExtName(fileName)).toBe(result);
  });
});
