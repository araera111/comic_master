// eslint-disable-next-line import/no-extraneous-dependencies
import { readdirSync, readFileSync, statSync } from 'fs';
import path, { dirname, extname, normalize } from 'path';

export const readDirSync = async (path: string) => readdirSync(path);
export const nodeReadFileSync64 = async (path: string) => readFileSync(path, { encoding: 'base64' });
export const nodeReadFileSync = async (path: string) => readFileSync(path);
export const normalizePath = (str: string) => normalize(str);
export const paths = () => path;
export const nodeFsStats = async (path: string) => statSync(path);
export const nodeExtnum = async (path: string) => extname(path);
export const nodeDirname = async (path: string) => dirname(path);
