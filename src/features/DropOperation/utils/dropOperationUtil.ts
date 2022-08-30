import { unzipSync } from 'fflate';
import { basename } from 'path';
import { includes, toPairs } from 'rambda';
import { nodeExtnum, nodeReadFileSync, nodeReadFileSync64, readDirSync } from '../../../nodeUtil/node-api';

export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => String.fromCharCode(...uint8Array);

export const enableExtnames = ['jpg', 'jpeg', 'png'];

export const getExtName = (path: string): string => path.split('.').pop() ?? '';

export const getDirectoryImageFiles = async (path: string): Promise<[string[], string[]]> => {
  const files = await readDirSync(path);
  const result = files
    .map((fileName) => `${path}\\${fileName}`)
    .filter(async (filePath) => {
      const extName = await nodeExtnum(filePath);
      return enableExtnames.includes(extName);
    });
  let arr: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const path of result) {
    // eslint-disable-next-line no-await-in-loop
    const base64 = await nodeReadFileSync64(path);
    const url = `data:image/png;base64,${base64}`;
    arr = [...arr, url];
  }
  return [arr, result];
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

export const unzip = async (path: string) => {
  const data = await nodeReadFileSync(path);
  const decompressed = await unzipSync(data);

  /* jpg,pngなどでフィルタ */
  const pairs = toPairs(decompressed).filter(([fileName]) => {
    const extName = getExtName(fileName);
    return includes(extName, enableExtnames);
  });

  let arr: string[] = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [_, iter] of pairs) {
    const blob = new Blob([iter], { type: 'image/png' });
    // eslint-disable-next-line no-await-in-loop
    const d = (await BlobToURI(blob)) as string;
    arr = [...arr, d];
  }
  return arr;
};
