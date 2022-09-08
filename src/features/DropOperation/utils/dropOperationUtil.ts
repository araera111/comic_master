import dayjs from 'dayjs';
import { unzipSync } from 'fflate';
import { statSync } from 'fs';
import { basename } from 'path';
import { includes, toPairs } from 'rambda';
import { nodeReadFileSync, nodeReadFileSync64, readDirSync } from '../../../nodeUtil/node-api';
import { PageItem } from '../../Viewer/types/ViewerType';

export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => String.fromCharCode(...uint8Array);

export const enableExtnames = ['jpg', 'jpeg', 'png'];

export const getExtName = (path: string): string => path.split('.').pop() ?? '';

export const enableFileFilter = (files: string[], enableExtnames: string[]): string[] =>
  files.filter((file) => {
    const extName = getExtName(file);
    return enableExtnames.includes(extName);
  });

export const getDirectoryImageFiles = async (path: string): Promise<[string[], string[], Date[]]> => {
  const files = await readDirSync(path);
  const result = enableFileFilter(
    files.map((fileName) => `${path}/${fileName}`),
    enableExtnames
  );

  let arr: string[] = [];
  let mtimes: Date[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const path of result) {
    // eslint-disable-next-line no-await-in-loop
    const base64 = await nodeReadFileSync64(path);
    const url = `data:image/png;base64,${base64}`;
    // eslint-disable-next-line no-await-in-loop
    const stat = await statSync(path).mtime;
    arr = [...arr, url];
    mtimes = [...mtimes, stat];
  }
  return [arr, files, mtimes];
};

export const getFileIndexFromFileName = (files: string[], fileName: string) =>
  files.findIndex((file) => basename(file) === basename(fileName));

export function BlobToURI(blob: Blob) {
  const fileReader = new FileReader();
  // eslint-disable-next-line no-promise-executor-return
  const promise = new Promise((resolve) => (fileReader.onload = () => resolve(fileReader.result)));
  fileReader.readAsDataURL(blob);
  return promise;
}

export const unzip = async (path: string): Promise<[string[], string[], Date[]]> => {
  const data = await nodeReadFileSync(path);
  const decompressed = await unzipSync(data);

  /* jpg,pngなどでフィルタ */
  const pairs = toPairs(decompressed).filter(([fileName]) => {
    const extName = getExtName(fileName);
    return includes(extName, enableExtnames);
  });

  let urls: string[] = [];
  let fileNames: string[] = [];
  let mtimes: Date[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [_, iter] of pairs) {
    const blob = new Blob([iter], { type: 'image/png' });
    // eslint-disable-next-line no-await-in-loop
    const url = (await BlobToURI(blob)) as string;
    // eslint-disable-next-line no-await-in-loop
    urls = [...urls, url];
    fileNames = [...fileNames, _];
    mtimes = [...mtimes, dayjs().toDate()];
  }
  return [urls, fileNames, mtimes];
};

export const createStrObject = (strList: string[] | Date[], key: string) =>
  strList.map((str) => ({
    [key]: str
  }));

export const mergeListObject = (
  leftList: any[],
  leftKey: string,
  rightList: any[],
  rightKey: string,
  rRightList: any[],
  rRightKey: string
) =>
  leftList.map((left, index) => ({
    [leftKey]: left[leftKey],
    [rightKey]: rightList[index][rightKey],
    [rRightKey]: rRightList[index][rRightKey]
  }));

export const mergeUrlFileName = (urlList: string[], fileNameList: string[], mtimes: Date[]): PageItem[] => {
  const urlObjects = createStrObject(urlList, 'url');
  const fileNameObjects = createStrObject(fileNameList, 'fileName');
  const statsObjects = createStrObject(mtimes, 'mtime');
  const result = mergeListObject(urlObjects, 'url', fileNameObjects, 'fileName', statsObjects, 'mtime');
  return result as PageItem[];
};
