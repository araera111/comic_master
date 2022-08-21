import { ReactNode } from 'react';
import { readDirSync } from '../../../samples/node-api';
import { useViewerStore } from '../../Viewer/stores/viewerStore';

type FileDropZoneProps = {
  children: ReactNode;
};

export const FileDropZone = ({ children }: FileDropZoneProps) => {
  const setPageUrlList = useViewerStore((state) => state.setPageUrlList);
  const resetPage = useViewerStore((state) => state.resetPage);
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={async (e) => {
        e.preventDefault();
        const { path } = e.dataTransfer.files[0];
        const files = await readDirSync(path);
        const result = files.map((fileName) => `${path}/${fileName}`);
        setPageUrlList(result);
        /* ファイルを読み込んだらリセットする */
        resetPage();
      }}
    >
      {children}
    </div>
  );
};
