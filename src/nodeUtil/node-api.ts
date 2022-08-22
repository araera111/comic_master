// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import { readdirSync, readFileSync, statSync } from 'fs';
import { lstat } from 'fs/promises';
import path, { dirname, extname, normalize } from 'path';
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
export const nodeReadFileSync64 = async (path: string) => readFileSync(path, { encoding: 'base64' });
export const nodeReadFileSync = async (path: string) => readFileSync(path);
export const normalizePath = (str: string) => normalize(str);
export const paths = () => path;
export const nodeFsStats = async (path: string) => statSync(path);
export const nodeExtnum = async (path: string) => extname(path);
export const nodeDirname = async (path: string) => dirname(path);
