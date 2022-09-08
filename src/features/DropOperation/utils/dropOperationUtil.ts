import { unzipSync } from 'fflate';
import { Stats, statSync } from 'fs';
import { basename } from 'path';
import { includes, toPairs } from 'rambda';
import { nodeExtnum, nodeReadFileSync, nodeReadFileSync64, readDirSync } from '../../../nodeUtil/node-api';
import { PageItem } from '../../Viewer/types/ViewerType';

export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => String.fromCharCode(...uint8Array);

export const enableExtnames = ['jpg', 'jpeg', 'png'];

export const getExtName = (path: string): string => path.split('.').pop() ?? '';

export const getDirectoryImageFiles = async (path: string): Promise<[string[], string[], Stats[]]> => {
  const files = await readDirSync(path);
  console.log({ files });
  const result = files
    .map((fileName) => `${path}/${fileName}`)
    .filter(async (filePath) => {
      const extName = await nodeExtnum(filePath);
      return enableExtnames.includes(extName);
    });
  let arr: string[] = [];
  let stats: Stats[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const path of result) {
    // eslint-disable-next-line no-await-in-loop
    const base64 = await nodeReadFileSync64(path);
    const url = `data:image/png;base64,${base64}`;
    // eslint-disable-next-line no-await-in-loop
    const stat = await statSync(path);
    arr = [...arr, url];
    stats = [...stats, stat];
  }
  return [arr, files, stats];
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

export const unzip = async (path: string): Promise<[string[], string[]]> => {
  const data = await nodeReadFileSync(path);
  const decompressed = await unzipSync(data);

  /* jpg,pngなどでフィルタ */
  const pairs = toPairs(decompressed).filter(([fileName]) => {
    const extName = getExtName(fileName);
    return includes(extName, enableExtnames);
  });

  let urls: string[] = [];
  let fileNames: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [_, iter] of pairs) {
    const blob = new Blob([iter], { type: 'image/png' });
    // eslint-disable-next-line no-await-in-loop
    const url = (await BlobToURI(blob)) as string;
    urls = [...urls, url];
    fileNames = [...fileNames, _];
  }
  return [urls, fileNames];
};

export const createStrObject = (strList: string[], key: string) =>
  strList.map((str) => ({
    [key]: str
  }));

export const mergeListObject = (leftList: any[], leftKey: string, rightList: any[], rightKey: string) =>
  leftList.map((left, index) => ({ [leftKey]: left[leftKey], [rightKey]: rightList[index][rightKey] }));

export const mergeUrlFileName = (urlList: string[], fileNameList: string[]): PageItem[] => {
  const urlObjects = createStrObject(urlList, 'url');
  const fileNameObjects = createStrObject(fileNameList, 'fileName');
  const result = mergeListObject(urlObjects, 'url', fileNameObjects, 'fileName');
  return result as PageItem[];
};
