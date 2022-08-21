// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { readdirSync } from 'fs';
import { lstat } from 'fs/promises';
import path, { normalize } from 'path';
import { cwd } from 'process';

ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});

lstat(cwd())
  .then((stats) => {
    console.log('[fs.lstat]', stats);
  })
  .catch((err) => {
    console.error(err);
  });

export const readDirSync = async (path: string) => readdirSync(path);
export const normalizePath = (str: string) => normalize(str);
export const paths = () => path;
