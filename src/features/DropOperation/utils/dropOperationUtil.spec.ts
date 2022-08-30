import { createStrObject, getExtName, getFileIndexFromFileName, mergeListObject } from './dropOperationUtil';

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

describe('getFileIndexFromFileName', () => {
  it('case1: [a b c] -> a 0', () => {
    const files = ['a', 'b', 'c'];
    const fileName = 'a';
    expect(getFileIndexFromFileName(files, fileName)).toBe(0);
  });

  it('case1: [a b c] -> b 1', () => {
    const files = ['a', 'b', 'c'];
    const fileName = 'b';
    expect(getFileIndexFromFileName(files, fileName)).toBe(1);
  });
});

describe('createStrObject', () => {
  it('case1:', () => {
    const urls = ['a', 'b'];
    const key = 'url';
    const result = [{ url: 'a' }, { url: 'b' }];
    expect(createStrObject(urls, key)).toStrictEqual(result);
  });
});

describe('mergeListObject', () => {
  it('case1', () => {
    const urlObj = [{ url: 'a' }];
    const fileNameObj = [{ fileName: '1' }];
    const result = [{ url: 'a', fileName: '1' }];
    expect(mergeListObject(urlObj, 'url', fileNameObj, 'fileName')).toStrictEqual(result);
  });
});
