import { basename } from 'path';
import { nodeExtnum, nodeReadFileSync64, readDirSync } from '../../../nodeUtil/node-api';

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
