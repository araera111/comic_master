import { decompressSync, unzipSync } from 'fflate';
import { values } from 'rambda';
import { ReactNode } from 'react';
import { nodeExtnum, nodeFsStats, nodeReadFileSync, nodeReadFileSync64, readDirSync } from '../../../samples/node-api';
import { useViewerStore } from '../../Viewer/stores/viewerStore';
import { uint8ArrayToBase64 } from '../utils/dropOperationUtil';

type FileDropZoneProps = {
  children: ReactNode;
};
export function BlobToURI(blob: Blob) {
  const fileReader = new FileReader();
  // eslint-disable-next-line no-promise-executor-return
  const promise = new Promise((resolve) => (fileReader.onload = () => resolve(fileReader.result)));
  fileReader.readAsDataURL(blob);
  return promise;
}

export const FileDropZone = ({ children }: FileDropZoneProps) => {
  const setPageUrlList = useViewerStore((state) => state.setPageUrlList);
  const resetPage = useViewerStore((state) => state.resetPage);
  const directory = async (path: string) => {
    const files = await readDirSync(path);
    const okExt = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    const result = files
      .map((fileName) => `${path}/${fileName}`)
      .filter(async (filePath) => {
        const extName = await nodeExtnum(filePath);
        return okExt.includes(extName);
      });
    let arr: string[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const path of result) {
      // eslint-disable-next-line no-await-in-loop
      const base64 = await nodeReadFileSync64(path);
      const url = `data:image/png;base64,${base64}`;
      arr = [...arr, url];
    }
    setPageUrlList(arr);
    /* ファイルを読み込んだらリセットする */
    resetPage();
  };
  const zip = async (path: string) => {
    const data = await nodeReadFileSync(path);
    const decompressed = await unzipSync(data);
    const result = values(decompressed);
    const blob = new Blob([result[0]]);

    const d = (await BlobToURI(blob)) as string;
    console.log({ d });
    const arr: string[] = [d];
    setPageUrlList(arr);
    /* ファイルを読み込んだらリセットする */
    resetPage();
  };
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={async (e) => {
        e.preventDefault();
        const { path, type } = e.dataTransfer.files[0];
        console.log({ path, type });
        const stats = await nodeFsStats(path);
        const isDir = stats.isDirectory();
        if (isDir) {
          directory(path);
          return;
        }
        if (type === 'application/x-zip-compressed' || type === 'application/zip') {
          zip(path);
        }
      }}
    >
      {children}
    </div>
  );
};
