import { ReactNode } from 'react';
import { nodeDirname, nodeFsStats } from '../../../nodeUtil/node-api';
import { useViewerStore } from '../../Viewer/stores/viewerStore';
import { fixPage } from '../../Viewer/utils/viewerUtil';
import { getDirectoryImageFiles, getFileIndexFromFileName, unzip } from '../utils/dropOperationUtil';

type FileDropZoneProps = {
  children: ReactNode;
};

interface FileAddPath extends File {
  path: string;
}

export const FileDropZone = ({ children }: FileDropZoneProps) => {
  const setPageUrlList = useViewerStore((state) => state.setPageUrlList);
  const resetPage = useViewerStore((state) => state.resetPage);
  const setPage = useViewerStore((state) => state.setPage);
  const mode = useViewerStore((state) => state.mode);
  const directory = async (path: string) => {
    const [imageFiles] = await getDirectoryImageFiles(path);
    setPageUrlList(imageFiles);
    resetPage();
  };
  const zip = async (path: string) => {
    const result = await unzip(path);
    setPageUrlList(result);
    resetPage();
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={async (e) => {
        e.preventDefault();
        const item0 = e.dataTransfer.files.item(0);
        if (item0 === null) return;
        const { path, type } = item0 as FileAddPath;
        const stats = await nodeFsStats(path);
        const isDir = stats.isDirectory();
        if (isDir) {
          directory(path);
          return;
        }
        if (type === 'application/x-zip-compressed' || type === 'application/zip') {
          zip(path);
        }

        if (type === 'image/jpeg') {
          const directory = await nodeDirname(path);
          const [imageFiles, fileNames] = await getDirectoryImageFiles(directory);
          setPageUrlList(imageFiles);
          const fileIndex = getFileIndexFromFileName(fileNames, path);
          const fixedPage = fixPage(fileIndex, imageFiles.length, mode);
          setPage(fixedPage);
        }
      }}
    >
      {children}
    </div>
  );
};
